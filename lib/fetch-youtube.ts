import { siteConfig } from "@/config/site";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoLink: string;
  embedLink: string;
  publishedAt: string;
  channelTitle: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface YouTubeResponse {
  videos: YouTubeVideo[];
  pageInfo: PageInfo;
}

const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${siteConfig?.API_KEY.play_list_id}&maxResults=50&key=${siteConfig?.API_KEY?.youtube_key}`;

export async function fetchYouTubeVideos(): Promise<YouTubeResponse> {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // Map the data to return a simpler structure for videos
    const videos: YouTubeVideo[] = data.items.map((item: any) => {
      const videoId = item.snippet.resourceId.videoId;

      return {
        id: videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.maxres.url,
        videoLink: `https://www.youtube.com/watch?v=${videoId}`,
        embedLink: `https://www.youtube.com/embed/${videoId}`,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
      };
    });

    // Extract pageInfo
    const pageInfo: PageInfo = {
      totalResults: data.pageInfo.totalResults,
      resultsPerPage: data.pageInfo.resultsPerPage,
    };

    return { videos, pageInfo };
  } catch (error) {
    // console.error("Error fetching YouTube videos:", error);

    return { videos: [], pageInfo: { totalResults: 0, resultsPerPage: 0 } };
  }
}

interface YouTubeVideoDetails {
  id: string;
  title: string;
  thumbnail: string;
  videoLink: string;
  embedLink: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
}

export async function fetchSingleYouTubeVideo(
  videoId: string,
  apiKey: string = String(siteConfig?.API_KEY?.youtube_key),
): Promise<YouTubeVideoDetails | null> {
  const API_URL = (videoId: string, apiKey: string) =>
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  try {
    const res = await fetch(API_URL(videoId, apiKey));
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      // console.error("No video found for the given ID");

      return null;
    }

    const videoData = data.items[0].snippet;
    const videoDetails: YouTubeVideoDetails = {
      id: videoId,
      title: videoData.title,
      thumbnail: videoData.thumbnails.medium.url,
      videoLink: `https://www.youtube.com/watch?v=${videoId}`,
      embedLink: `https://www.youtube.com/embed/${videoId}`,
      channelTitle: videoData.channelTitle,
      description: videoData.description,
      publishedAt: videoData.publishedAt,
    };

    return videoDetails;
  } catch (error) {
    // console.error("Error fetching video details:", error);

    return null;
  }
}
