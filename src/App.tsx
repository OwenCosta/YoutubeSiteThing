import { useState } from 'react'
import SearchBar from './components/SearchBar'
import VideoGrid from './components/VideoGrid'
import VideoPlayer from './components/VideoPlayer'
import './App.css'

interface Video {
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

function App() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setVideos([])
      setSelectedVideo(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Use Vite env var VITE_YT_API_KEY (set in .env). This keeps the code simple for GitHub Pages.
      // For production you should proxy this on a server to avoid exposing the key.
      const API_KEY = import.meta.env.VITE_YT_API_KEY as string | undefined
      if (!API_KEY) {
        throw new Error('Missing YouTube API key. Set VITE_YT_API_KEY in your .env')
      }

      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}`

      const res = await fetch(url)
      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`YouTube API error: ${res.status} ${res.statusText} ${text}`)
      }

      const data = await res.json()
      setVideos(data.items || [])
      if (data.items && data.items.length > 0) {
        setSelectedVideo(data.items[0])
      } else {
        setSelectedVideo(null)
      }
    } catch (err) {
      console.error('search error', err)
      setError(err instanceof Error ? `Failed to search videos: ${err.message}` : 'Failed to search videos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="bg-red-600 text-white p-4">
        <h1 className="text-3xl font-bold">YouTube Site Thing</h1>
        <p className="text-sm opacity-90">Stream YouTube videos on our platform</p>
      </header>

      <main className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {selectedVideo ? (
              <VideoPlayer video={selectedVideo} />
            ) : (
              <div className="text-center py-8 text-gray-500">Select a video to play</div>
            )}
          </div>
          <div className="lg:col-span-1">
            <VideoGrid
              videos={videos}
              onSelectVideo={(v) => setSelectedVideo(v)}
              isLoading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
