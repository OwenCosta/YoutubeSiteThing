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

interface VideoPlayerProps {
  video: Video
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoId = video.id.videoId
  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={video.snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{video.snippet.title}</h2>
        <p className="text-gray-600 mb-2">{video.snippet.channelTitle}</p>
        <p className="text-sm text-gray-500 mb-4">
          Published: {new Date(video.snippet.publishedAt).toLocaleDateString()}
        </p>
        <div className="text-gray-700">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="line-clamp-4">{video.snippet.description}</p>
        </div>
      </div>
    </div>
  )
}
