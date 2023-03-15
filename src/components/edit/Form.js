import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditVideoMutation, useGetVideoQuery } from "../../rtk/features/api/apiSlice";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import Error from "../ui/Error"
import Success from '../ui/Success'

export default function Form({ video }) {



    const [input, setInput] = useState({
        title: video?.title,
        author: video?.author,
        description: video?.description,
        link: video?.link,
        thumbnail: video?.thumbnail,
        date: video?.date,
        duration: video?.duration,
        views: video?.views
    })

    const handleChange = (e) => {
        setInput(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    // adding the video
    const [editVideo, { data: updatedVideo, isSuccess, isLoading, isError }] = useEditVideoMutation()

    const handleSubmit = (e) => {
        e.preventDefault()

        editVideo({ id: video.id, data: input })
        console.log(input);
    }



    return (
        <form onSubmit={handleSubmit} method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                title="Video Title"
                                name="title"
                                value={input?.title}
                                onChange={handleChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                title="Author"
                                name="author"
                                value={input.author}
                                onChange={handleChange} />
                        </div>

                        <div className="col-span-6">
                            <TextArea
                                title="Description"
                                name="description"
                                value={input.description}
                                onChange={handleChange} />
                        </div>

                        <div className="col-span-6">
                            <TextInput
                                title="YouTube Video link"
                                name="link"
                                value={input.link}
                                onChange={handleChange} />
                        </div>

                        <div className="col-span-6">
                            <TextInput
                                title="Thumbnail link"
                                name="thumbnail"
                                value={input.thumbnail}
                                onChange={handleChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput
                                title="Upload Date"
                                name="date"
                                value={input.date}
                                onChange={handleChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput
                                title="Video Duration"
                                name="duration"
                                value={input.duration}
                                onChange={handleChange} />
                        </div>


                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput
                                title="Video no of views"
                                name="views"
                                value={input.views}
                                onChange={handleChange} />
                        </div>


                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>

                {!isLoading && isError && <Error message="something error occurred on deleting"></Error>}

                {!isLoading && isSuccess && <Success message="Successfully edited"></Success>}


            </div>
        </form>
    );
}
