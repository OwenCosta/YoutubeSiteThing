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

interface VideoGridProps {
  videos: Video[]
  onSelectVideo: (video: Video) => void
  isLoading: boolean
}

export default function VideoGrid({ videos, onSelectVideo, isLoading }: VideoGridProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading videos...</div>
  }

  if (videos.length === 0) {
    return <div className="text-center py-8 text-gray-500">No videos found. Try searching!</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 max-h-screen overflow-y-auto">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          onClick={() => onSelectVideo(video)}
          className="cursor-pointer hover:opacity-80 transition"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-auto"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2">{video.snippet.title}</h3>
              <p className="text-xs text-gray-600">{video.snippet.channelTitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
