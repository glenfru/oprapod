// Mock data for posts and comments
export const allMockPosts = [
  {
    id: 1,
    title: "Life lessons from Oprah's interview with Maya Angelou",
    body: "Just rewatched this incredible conversation and I'm still getting chills. The way Maya Angelou speaks about resilience and finding your voice is absolutely transformative.\n\nKey moments that stood out:\n- 'When people show you who they are, believe them the first time'\n- Her thoughts on forgiveness as a gift to yourself\n- The importance of having courage in your convictions\n- How literature can be a pathway to understanding humanity\n\nThis interview changed how I think about personal growth and the power of storytelling. What were your biggest takeaways?",
    score: 234,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "wisdom_seeker",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Maya Angelou: The Complete Interview",
      slug: "maya-angelou-complete-interview"
    },
    _count: {
      comments: 67
    }
  },
  {
    id: 2,
    title: "Book recommendation: 'Priceless Facts About Money' insights",
    body: "Mellody Hobson's episode was incredible! Her practical advice about financial literacy is exactly what I needed. The way she breaks down complex investment concepts makes them accessible to everyone.\n\nSome key takeaways:\n- Start investing early, even with small amounts\n- Understand the difference between good debt and bad debt\n- Don't let fear keep you from building wealth\n- Diversification is crucial for long-term success\n\nWhat did you think about her advice on talking to kids about money? I found that section particularly enlightening.",
    score: 156,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "finance_enthusiast",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Mellody Hobson: Priceless Facts About Money",
      slug: "mellody-hobson-money-facts"
    },
    _count: {
      comments: 34
    }
  },
  {
    id: 3,
    title: "The power of gratitude - Oprah's daily practice",
    body: "I've been following Oprah's gratitude practice for 30 days now and the results are amazing! Writing down 5 things I'm grateful for each day has completely shifted my perspective.\n\nWhat I've noticed:\n- More awareness of small positive moments\n- Better sleep quality\n- Improved relationships with family and friends\n- Less anxiety about daily stressors\n- A general sense of abundance rather than scarcity\n\nAnyone else tried this? I'd love to hear about your experiences with gratitude journaling!",
    score: 89,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "grateful_heart",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "The Science of Gratitude",
      slug: "science-of-gratitude"
    },
    _count: {
      comments: 23
    }
  }
]

export const mockComments = [
  {
    id: 1,
    body: "This is exactly what I needed to hear! I've been putting off investing because it seemed too complicated, but Mellody's approach makes it feel achievable.",
    score: 23,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "new_investor",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    children: [
      {
        id: 2,
        body: "Same here! I started with just $25 a week after listening to this episode. Small steps really do add up.",
        score: 12,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        author: {
          username: "finance_enthusiast",
          avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
        },
        children: []
      }
    ]
  },
  {
    id: 3,
    body: "The part about talking to kids about money was my favorite too! I wish my parents had these conversations with me when I was younger.",
    score: 18,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "mindful_parent",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    children: []
  }
]