import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import { useDeleteVideoMutation } from "../../rtk/features/api/apiSlice";
import Error from "../ui/Error";

export default function Description({ video }) {

    const { id, title, description, date } = video || {}


    const [deleteVideo, { isSuccess, isError }] = useDeleteVideoMutation()

    const handleDelete = (id) => {
        deleteVideo(id)
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    return (
        <div>
            {isError && <Error message="deletion failed"></Error>}

            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
                {title}
            </h1>
            <div className="pb-4 flex items-center space-between border-b gap-4">
                <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
                    Uploaded on {date}
                </h2>

                <div className="flex gap-6 w-full justify-end">

                    <Link to={`/videos/edit/${id}`}>
                        <div className="flex gap-1">
                            <div className="shrink-0">
                                <img
                                    className="w-5 block"
                                    src={editImage}
                                    alt="Edit"
                                />
                            </div>
                            <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                                Edit
                            </span>
                        </div>
                    </Link>


                    <div className="flex gap-1 cursor-pointer" onClick={() => handleDelete(id)}>
                        <div className="shrink-0">
                            <img
                                className="w-5 block"
                                src={deleteImage}
                                alt="Delete"
                            />
                        </div>
                        <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                            Delete
                        </div>
                    </div>


                </div>
            </div>

            <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
                {description}
            </div>

        </div >

    );
}
