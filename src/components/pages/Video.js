import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../rtk/features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from '../ui/loaders/PlayerLoader'
import DescriptionLoader from '../ui/loaders/DescriptionLoader'
import RelatedVideoLoader from '../ui/loaders/RelatedVideoLoader'
import Error from '../ui/Error'

export default function Video() {
    const { videoId } = useParams()
    const { data: video, isLoading, isError } = useGetVideoQuery(videoId)

    // loading & error handling
    let content
    if (isLoading) {
        content = <>
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
                <div className="col-span-full w-full space-y-8 lg:col-span-2">
                    <PlayerLoader></PlayerLoader>
                    <DescriptionLoader></DescriptionLoader>
                </div>

                <RelatedVideoLoader></RelatedVideoLoader>
            </div></>
    }

    if (!isLoading && !isError && video) {
        content = <>
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
                <div className="col-span-full w-full space-y-8 lg:col-span-2">
                    <Player link={video?.link} />
                    <Description video={video} />
                </div>

                <RelatedVideos video={video} />
            </div>
        </>
    }

    if (!isLoading && isError) {
        content = <Error></Error>
    }

    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">

                {content}

            </div>
        </section>
    );
}
