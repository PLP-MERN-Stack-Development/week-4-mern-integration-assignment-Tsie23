import { useEffect, useState } from "react";
import { postService } from "../services/api";
import useApi from '../hooks/useApi';
import { Link } from 'react-router-dom';

export default function PostList() {
    const { call, loading, error } = useApi(postService.getAllPosts);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        call(page).then(data => {
            setPosts(data.posts);
            setTotalPages(data.pages || 1);
        }).catch(() => {/*handled*/});
    }, [page]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        try {
            const data = await postService.searchPosts(search);
            setPosts(data);
            setTotalPages(1);
        } finally {
            setSearching(false);
        }
    };

    if (loading) return <p>Loading posts_</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <form onSubmit={handleSearch} style={{marginBottom:'1em'}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search posts..." />
                <button disabled={searching}>Search</button>
            </form>
            {posts.map(p=>(
                <article key={p._id}>
                    <h2><Link to={`/posts/${p._id}`}>{p.title}</Link></h2>
                    <p>By {p.author.name} in {p.category.name}</p>
                </article>
            ))}
            <div style={{marginTop:'1em'}}>
                {Array.from({length: totalPages}, (_,i)=>(
                    <button key={i+1} onClick={()=>setPage(i+1)} disabled={page===i+1}>{i+1}</button>
                ))}
            </div>
        </div>
    );
}

