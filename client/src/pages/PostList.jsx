import { useEffect, useState } from "react";
import { postService } from "../services/api";
import useApi from '../hooks/useApi';
import { Link } from 'react-router-dom';

export default function PostList() {
    const { call, loading, error } = useApi(postService.getAllPosts);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        call().then(data => setPosts(data.posts)).catch(() => {/*handled*/});
    },[]);

    if (loading) return <p>Loading posts_</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {posts.map(p=>(
                <article key={p._id}>
                    <h2><Link to={`/posts/${p._id}`}>{p.title}</Link></h2>
                    <p>By {p.author.name} in {p.category.name}</p>
                </article>
            ))}
        </div>
    );
}

