import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddVideoMutation } from "../../rtk/features/api/apiSlice";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form() {


    const [input, setInput] = useState({
        title: "",
        author: "",
        description: "",
        link: "",
        thumbnail: "",
        date: "",
        duration: "",
        views: ""
    })

    const handleChange = (e) => {
        setInput(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    // adding the video
    const [addVideo, { data, isLoading, isSuccess, isError }] = useAddVideoMutation()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addVideo(input)
        navigate('/')
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

                {!isLoading && isSuccess && <Success message="video added successfully" ></Success>}
            </div>
        </form >
    );
}
