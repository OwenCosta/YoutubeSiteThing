import axios from 'axios'

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeSearchResult {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: {
        url: string
      }
    }
    channelTitle: string
    publishedAt: string
  }
}

export async function searchVideos(query: string, maxResults: number = 20): Promise<YouTubeSearchResult[]> {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured')
    }

    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        q: query,
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        type: 'video',
        maxResults,
        order: 'relevance',
      },
    })

    return response.data.items || []
  } catch (error) {
    console.error('YouTube API Error:', error)
    throw new Error('Failed to search videos')
  }
}

export async function getVideoDetails(videoId: string) {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured')
    }

    const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        id: videoId,
        key: YOUTUBE_API_KEY,
        part: 'snippet,statistics,contentDetails',
      },
    })

    return response.data.items?.[0] || null
  } catch (error) {
    console.error('YouTube API Error:', error)
    throw new Error('Failed to fetch video details')
  }
}
