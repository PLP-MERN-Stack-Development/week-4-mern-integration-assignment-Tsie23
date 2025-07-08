import {useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { postService } from '../services/api';

export default function PostView() {
    const { id } = useParams();
    const { call, loading, error } = useApi(postService.getPost);
    const [post, setPost] = useState(null);

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={`/uploads/${post.featuredImage}`} alt={post.title} width="400" />
            <div dangerouslySetInnerHTML={{__html:post.content}} />
        </div>
    );
}
