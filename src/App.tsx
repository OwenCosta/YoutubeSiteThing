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
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // TODO: Implement YouTube API search
      console.log('Searching for:', query)
    } catch (err) {
      setError('Failed to search videos. Please try again.')
      console.error(err)
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
            {selectedVideo && <VideoPlayer video={selectedVideo} />}
          </div>
          <div className="lg:col-span-1">
            <VideoGrid 
              videos={videos} 
              onSelectVideo={setSelectedVideo}
              isLoading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
