import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
    title : string;
    content: string;
    id: string;
    author: {
        name: string;
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<Blog>();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const url = `${BACKEND_URL}/api/v1/blog/${id}`

    useEffect(()=>{
        axios.get(url , {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                setBlog(response.data.blog)
                setLoading(false)
            })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(()=>{
        if (!token){
            navigate("/signin")
        }
        else {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: token
                }
            })
                .then(response => {
                    setBlogs(response.data.blogs)
                    setLoading(false)
                })
        }
    }, [])

    return {
        loading,
        blogs
    }
}