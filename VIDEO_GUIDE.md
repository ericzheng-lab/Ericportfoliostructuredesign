# How to Add Videos to Your Portfolio

Your portfolio now supports videos! When you click the play button on a project thumbnail, it will play the video inline.

## Adding Videos from Your Computer

### Option 1: Add Videos to Your Project (Recommended for Small Files)

1. **Create a videos folder** in your project:
   - Place your video files in `/public/videos/` folder
   - Example: `/public/videos/my-reel.mp4`

2. **Reference the video** in your project:
```javascript
{
  id: "1",
  name: "Your Project",
  thumbnail: "https://your-thumbnail.jpg",
  videoUrl: "/videos/my-reel.mp4", // Path to your local video
  videoType: "direct"
}
```

**Supported formats**: MP4 (recommended), WebM
**Note**: Keep video files under 50MB for best performance

### Option 2: Use Video Hosting Services (Recommended for Large Files)

For professional reels and larger files, upload to:

**Vimeo (Recommended for Professionals)**
1. Upload your video to Vimeo.com
2. Get the video URL (e.g., `https://vimeo.com/123456789`)
3. Add to your project:
```javascript
{
  videoUrl: "https://vimeo.com/123456789",
  videoType: "vimeo"
}
```

**YouTube**
1. Upload to YouTube.com
2. Get the video URL
3. Add to your project:
```javascript
{
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  videoType: "youtube"
}
```

### Option 3: Use Cloud Storage

Upload to cloud storage and get a public link:
- **Google Drive**: Upload → Share → Get link
- **Dropbox**: Upload → Share → Get direct link
- **AWS S3 / Cloudinary**: Professional hosting options

## Video Types Supported

### 1. **YouTube Videos**
```javascript
{
  id: "1",
  name: "Your Project",
  // ... other fields
  thumbnail: "https://your-thumbnail-image.jpg",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  videoType: "youtube"
}
```

### 2. **Vimeo Videos**
```javascript
{
  id: "2",
  name: "Your Project",
  // ... other fields
  thumbnail: "https://your-thumbnail-image.jpg",
  videoUrl: "https://vimeo.com/VIDEO_ID",
  videoType: "vimeo"
}
```

### 3. **Direct Video Files** (MP4, WebM)
```javascript
{
  id: "3",
  name: "Your Project",
  // ... other fields
  thumbnail: "https://your-thumbnail-image.jpg",
  videoUrl: "https://your-server.com/videos/your-video.mp4",
  videoType: "direct"
}
```

## How It Works

1. **Thumbnail Display**: By default, your project shows the thumbnail image
2. **Play Button**: When you hover over a project with a video, a play button appears
3. **Video Playback**: Click the play button to replace the thumbnail with the video player
4. **Auto-play**: Videos start playing automatically when clicked

## Adding Videos to Your Projects

Edit the `projects` array in `/src/app/App.tsx`:

```javascript
const projects = [
  {
    id: "1",
    name: "Velocity",
    client: "Audi",
    agency: "Wieden+Kennedy",
    production: "Smuggler",
    credits: "Executive Producer",
    thumbnail: "https://your-thumbnail.jpg", // Reel screenshot
    videoUrl: "https://vimeo.com/123456789", // Your video URL
    videoType: "vimeo", // or "youtube" or "direct"
    additionalImages: [
      "https://image1.jpg",
      "https://image2.jpg"
    ],
    year: "2025"
  },
  // ... more projects
];
```

## Tips

- Use high-quality thumbnail images (reel screenshots) for the best visual impact
- For YouTube: Use any YouTube URL format (watch?v=ID or youtu.be/ID)
- For Vimeo: Use the standard Vimeo URL (vimeo.com/VIDEO_ID)
- For direct files: Make sure the video file is publicly accessible
- If you don't add a `videoUrl`, the project will only show images (play button won't appear)

## Future Enhancements (Optional)

You can also add videos to the smaller thumbnails below using `additionalVideos`:

```javascript
additionalVideos: [
  { url: "https://youtube.com/watch?v=ID", type: "youtube", thumbnail: "thumb.jpg" },
  { url: "https://vimeo.com/123", type: "vimeo", thumbnail: "thumb2.jpg" }
]
```

This feature is already supported in the code structure but not yet implemented in the UI.