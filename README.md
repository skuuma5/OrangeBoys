# 🍊 OrangeBoys — Premium Streaming Platform

OrangeBoys is a modern, production-ready entertainment website for movies, series, and anime. Built with a cinematic dark theme and vibrant orange accents, it provides an immersive user experience similar to top-tier streaming services.

## 🚀 Features

- **Cinematic Homepage**: Dynamic hero sections, trending carousels, and personalized sections.
- **Unified Search**: Instant results across movies, series, and anime.
- **Dedicated Browse Pages**: Filtering and sorting for all content types.
- **Deep Content Details**: Backdrops, trailers, cast info, and related titles.
- **Advanced Video Player**: Custom controls, widescreen support, and configurable adapters.
- **User Accounts**: Authentication, watchlists, history, and favorites.
- **Admin Dashboard**: Role-based access for content and user management.
- **White-Label Architecture**: Easily configurable branding, colors, and providers.

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js
- **Metadata**: Movie of the Night / Streaming Availability API integration

## 📦 Getting Started

### 1. Prerequisites

- Node.js 18+
- No external database required for demo mode (SQLite is used locally)
- Movie of the Night API key for live title search

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/orangeboys.git
cd orangeboys

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# SQLite is used by default; edit the file only if you need API keys
```

### 3. Database Setup

```bash
npm run db:setup

# Demo account
# Email: demo@orangeboys.com
# Password: password123
```

To reset all local demo data:

```bash
npm run db:reset
```

### 4. Run the Development Server

```bash
npm run dev
```

## ⚙️ Configuration (White-Label)

OrangeBoys is designed to be easily rebranded:

- **Branding**: Edit `config/site.ts` to change the site name, logo text, and primary theme colors.
- **Styles**: Modify `tailwind.config.ts` and `app/globals.css` for deeper visual changes.
- **Content**: Connect your own media server or authorized providers in the admin dashboard.

## ▲ Vercel Deployment

1. Create a hosted PostgreSQL database with Neon, Supabase, or another Vercel-compatible provider.
2. Import the GitHub repository into Vercel and add the environment variables from `.env.example`.
3. Set `DATABASE_URL` to the hosted PostgreSQL connection string.
4. Set `NEXTAUTH_URL` to the final Vercel production URL and generate a strong `NEXTAUTH_SECRET`.
5. Run migrations once with `npm run db:migrate`, then deploy the project.
6. For GitHub login, add the Vercel callback URL to the OAuth app:
   `https://your-domain.vercel.app/api/auth/callback/github`

The checked-in migration is in `prisma/migrations/`. SQLite is only suitable for local development; persistent Vercel features require PostgreSQL.

## 🛡️ License

This project is intended for commercial use as a white-label solution. Ensure you comply with all metadata provider (TMDB) terms of service and have proper licensing for any streaming content.

---

Built with ❤️ by the OrangeBoys Team.
