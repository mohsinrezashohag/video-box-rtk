import { useGetRelatedVideosQuery } from "../../../rtk/features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from '../../ui/loaders/RelatedVideoLoader'

export default function RelatedVideos({ video }) {

    const { title, id } = video || {}

    const { data: videos, isLoading, isError } = useGetRelatedVideosQuery({ id, title })

    console.log("related videos", videos);


    let content
    if (isLoading) {
        content = <>
            <RelatedVideoLoader />
            <RelatedVideoLoader />
            <RelatedVideoLoader />
        </>
    }

    if (!isLoading && !isError) {
        content = videos.map(video => <RelatedVideo video={video} id={video.id}></RelatedVideo>)
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
