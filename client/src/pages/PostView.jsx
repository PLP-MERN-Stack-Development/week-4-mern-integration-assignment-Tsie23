import {useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { postService } from '../services/api';
import Comment from '../components/Comment';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function PostView() {
    const { id } = useParams();
    const { call, loading, error } = useApi(postService.getPost);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        call(id).then(setPost);
        postService.getComments(id).then(setComments);
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        setCommentLoading(true);
        try {
            await postService.addComment(id, { content: commentText });
            setCommentText('');
            const updated = await postService.getComments(id);
            setComments(updated);
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={`/uploads/${post.featuredImage}`} alt={post.title} width="400" />
            <div dangerouslySetInnerHTML={{__html:post.content}} />
            <h2>Comments</h2>
            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map(c => <Comment key={c._id} comment={c} />)}
            {user && (
                <form onSubmit={handleAddComment}>
                    <textarea value={commentText} onChange={e=>setCommentText(e.target.value)} required placeholder="Add a comment..." />
                    <button disabled={commentLoading || !commentText}>Add Comment</button>
                </form>
            )}
        </div>
    );
}
