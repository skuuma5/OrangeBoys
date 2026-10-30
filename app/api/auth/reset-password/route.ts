import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createHash } from "crypto"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "A valid reset token and password are required" }, { status: 400 })
    }

    const tokenHash = createHash("sha256").update(String(token)).digest("hex")
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    })

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "This reset link is invalid or has expired" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    })
    await prisma.passwordResetToken.deleteMany({ where: { email: resetToken.email } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Unable to reset password" }, { status: 500 })
  }
}
