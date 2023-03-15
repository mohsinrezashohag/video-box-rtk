import { useGetVideosQuery } from "../../rtk/features/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";
import Video from "./Video";
import VideosNotAvailable from "../ui/VideosNotAvailable";

export default function Videos() {
    const { data: videos, isError, error, isLoading } = useGetVideosQuery()

    // error handling
    let content;
    if (isLoading) {
        content = <>
            <VideoLoader></VideoLoader>
            <VideoLoader></VideoLoader>
            <VideoLoader></VideoLoader>
            <VideoLoader></VideoLoader>
        </>
    }
    if (!isLoading && !isError && videos.length > 0) {
        content = videos.map(video => <Video video={video} key={video.id}></Video>)
    }
    if (!isLoading && !isError && videos.length <= 0) {
        content = <VideosNotAvailable></VideosNotAvailable>
    }
    if (!isLoading && isError) {
        content = <Error></Error>
    }

    return content
}
