import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create system user
  const systemUser = await db.user.upsert({
    where: { id: 'system' },
    update: {},
    create: {
      id: 'system',
      email: 'system@oprahpodcast.com',
      username: 'system',
      isAdmin: true,
    },
  })

  // Create sample episodes
  const episodes = [
    {
      title: "Eckhart Tolle: A New Earth",
      slug: "eckhart-tolle-new-earth",
      pubDate: new Date('2024-12-01'),
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      bookTitle: "A New Earth",
      bookAuthor: "Eckhart Tolle",
      bookLink: "https://www.amazon.com/New-Earth-Awakening-Purpose-Selection/dp/0452289963",
      bookImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
      description: "Join Oprah and spiritual teacher Eckhart Tolle for a transformative conversation about consciousness, presence, and awakening to your life's purpose. In this profound discussion, Eckhart shares insights from his groundbreaking book 'A New Earth' and explores how we can transcend ego-based consciousness to find deeper meaning and peace in our daily lives.",
    },
    {
      title: "Mellody Hobson: Priceless Facts About Money",
      slug: "mellody-hobson-money-facts",
      pubDate: new Date('2024-11-24'),
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      bookTitle: "Priceless Facts About Money",
      bookAuthor: "Mellody Hobson",
      bookLink: "https://www.amazon.com/dp/example",
      description: "Financial expert Mellody Hobson shares essential wisdom about building wealth, understanding investments, and achieving financial freedom. This conversation covers practical strategies for financial literacy and empowerment.",
    },
    {
      title: "Wally Lamb: The River Is Waiting",
      slug: "wally-lamb-river-waiting",
      pubDate: new Date('2024-11-17'),
      bookTitle: "The River Is Waiting",
      bookAuthor: "Wally Lamb",
      bookLink: "https://www.amazon.com/dp/example",
      description: "Acclaimed author Wally Lamb discusses his latest novel, exploring themes of trauma, healing, and the power of human resilience through storytelling.",
    },
    {
      title: "Jacinda Ardern: A Different Kind of Power",
      slug: "jacinda-ardern-leadership",
      pubDate: new Date('2024-11-10'),
      bookTitle: "A Different Kind of Power",
      bookAuthor: "Jacinda Ardern",
      bookLink: "https://www.amazon.com/dp/example",
      description: "Former New Zealand Prime Minister Jacinda Ardern shares insights about compassionate leadership, governing with empathy, and creating positive change in the world.",
    },
  ]

  for (const episodeData of episodes) {
    const episode = await db.episode.upsert({
      where: { slug: episodeData.slug },
      update: episodeData,
      create: episodeData,
    })

    // Create discussion post for each episode
    await db.post.upsert({
      where: { 
        id: episode.id * 1000 // Ensure unique IDs
      },
      update: {},
      create: {
        id: episode.id * 1000,
        title: 'Episode Discussion',
        body: `Welcome to the discussion for "${episode.title}"!\n\nShare your thoughts, insights, and reactions to this episode. What resonated most with you?`,
        episodeId: episode.id,
        authorId: systemUser.id,
        isPinned: true,
        score: Math.floor(Math.random() * 50) + 10,
      },
    })

    console.log(`✅ Created episode: ${episode.title}`)
  }

  // Create sample users
  const sampleUsers = [
    {
      id: 'user_1',
      email: 'mindful.reader@example.com',
      username: 'mindful_reader',
      bio: 'Passionate about mindfulness and personal growth',
    },
    {
      id: 'user_2',
      email: 'book.lover@example.com',
      username: 'book_lover_2024',
      bio: 'Reading enthusiast and Oprah fan',
    },
    {
      id: 'user_3',
      email: 'wisdom.seeker@example.com',
      username: 'wisdom_seeker',
      bio: 'Always learning, always growing',
    },
  ]

  for (const userData of sampleUsers) {
    await db.user.upsert({
      where: { id: userData.id },
      update: userData,
      create: userData,
    })
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })