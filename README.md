# The Oprah Podcast Community

A full-stack community web application for The Oprah Podcast, featuring Reddit-style threaded discussions organized around podcast episodes.

## Features

- **Episode-based Communities**: Each podcast episode has its own discussion space
- **Reddit-style Interface**: Threaded posts and nested comments with voting
- **YouTube Integration**: Embedded episode videos
- **Book Spotlights**: Featured books with purchase links
- **Real-time Updates**: Live comment streams and vote counting
- **Responsive Design**: Mobile-optimized with Oprah brand colors
- **RSS Feed Integration**: Automatic episode ingestion
- **User Authentication**: Secure user management with Supabase

## Tech Stack

- **Frontend**: Next.js 14 App Router, React 18, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with Oprah brand colors
- **Icons**: Lucide React

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Supabase account)
- npm/yarn/pnpm

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd the-oprah-podcast-community
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   ```

3. **Database setup**:
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles with Oprah theme
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── e/[slug]/          # Episode pages
│   └── episodes/          # Episodes list
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── posts/            # Post-related components
│   └── episodes/         # Episode-related components
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client setup
│   ├── database.ts       # Prisma client
│   └── auth.ts           # Authentication utilities
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
└── README.md
```

## Database Schema

The application uses a Reddit-inspired data model:

- **Episodes**: Podcast episodes with metadata and book information
- **Posts**: User-created discussions linked to episodes
- **Comments**: Nested comments on posts (Reddit-style threading)
- **Votes**: Upvote/downvote system for posts and comments
- **Users**: User profiles with authentication

## Key Features Implementation

### Episode Pages (`/e/{slug}`)
Each episode gets its own community space with:
- Embedded YouTube video
- Book spotlight with purchase link
- Threaded discussion posts
- Real-time comment streams

### Reddit-style Voting
- Upvote/downvote system for posts and comments
- Score calculation and sorting
- Visual vote indicators

### RSS Feed Integration
Automatic parsing of The Oprah Podcast RSS feed:
- Creates new episode entries
- Extracts YouTube URLs and book information
- Seeds discussion posts

### Mobile-First Design
- Responsive layouts for all screen sizes
- Sticky mobile navigation
- Touch-optimized interactions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Tailwind CSS for styling

## Production Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy

### Supabase Setup

1. Create a new Supabase project
2. Copy your database URL and API keys
3. Run migrations: `npm run db:push`
4. Seed data: `npm run db:seed`

### Environment Variables

Required for production:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
CRON_SECRET="random-string-for-cron-security"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open a GitHub issue
- Check the documentation
- Review existing discussions

---

Built with ❤️ for The Oprah Podcast Community