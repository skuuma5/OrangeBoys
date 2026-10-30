import { NextResponse } from "next/server"
import { createHash, randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const normalizedEmail = String(email || "").trim().toLowerCase()

    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } })

    if (user) {
      const token = randomBytes(32).toString("hex")
      const tokenHash = createHash("sha256").update(token).digest("hex")

      await prisma.passwordResetToken.deleteMany({ where: { email: normalizedEmail } })
      await prisma.passwordResetToken.create({
        data: {
          email: normalizedEmail,
          tokenHash,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
      })

      if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
        const origin = new URL(request.url).origin
        const resetUrl = `${origin}/reset-password?token=${token}`

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM,
            to: normalizedEmail,
            reply_to: process.env.EMAIL_REPLY_TO || "support.orangeboys@gmail.com",
            subject: "Reset your OrangeBoys password",
            html: `
              <div style="font-family:Arial,sans-serif;color:#111;background:#fff;padding:24px">
                <h2>Reset your OrangeBoys password</h2>
                <p>Choose the button below to create a new password.</p>
                <p><a href="${resetUrl}" style="display:inline-block;background:#f97316;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none">Reset password</a></p>
                <p style="color:#666;font-size:13px">This link expires in 1 hour. If you did not request it, you can ignore this email.</p>
              </div>
            `,
          }),
        })

        if (!emailResponse.ok) {
          const emailError = await emailResponse.text()
          console.error("Resend password reset failed:", emailError)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists for that email, password reset instructions have been sent.",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Unable to process password reset" }, { status: 500 })
  }
}
