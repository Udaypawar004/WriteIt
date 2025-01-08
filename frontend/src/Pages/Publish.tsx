
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useRef, useEffect, useState } from "react";
import Appbar from "../Components/Appbar";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar isWriting={true} />
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full font-semibold bg-black focus:outline-none text-[56px] active:border-gray-500 text-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />

                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create-blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });

                    navigate(`/blog/${response.data.BlogId}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center bg-gray-900 bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height to auto to recalculate
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
        }
    };

    useEffect(() => {
        resizeTextarea(); // Resize on initial render
    }, []);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e); 
        resizeTextarea();
    };

    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between">
                    <div className="my-2 bg-gray-900 rounded-3xl w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            ref={textareaRef}
                            onChange={handleChange}
                            id="editor"
                            rows={1}
                            className="focus:outline-none block w-full p-3 bg-black text-2xl text-gray-300 border-0"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}