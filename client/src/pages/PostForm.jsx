import { useState, useEffect, useContext } from "react";
import { categoryService, postService } from "../services/api";
import useApi from "../hooks/useApi";
import { AuthContext } from "../context/AuthContext";

export default function PostForm({ editId }) {
    const { user } = useContext(AuthContext);
    const { call: getCats } = useApi(categoryService.getAllCategories);
    const { call: savePost, loading, error } = useApi (
        editId ? (data) => postService.updatePost(editId, data)
               : (data)  => postService.createPost(data)
    );
    const [cats, setCats] = useState([]);
    const [form, setForm] = useState({ title:'', content:'', category:'', featuredImage:null });

    useEffect(()=>{
        getCats().then(setCats);
        if(editId){
            postService.getPost(editId).then(p=> setForm({
                title:p.title, content:p.content, category:p.category._id, featuredImage:null
            }));
        }
    },[]);

    const handleSubmit = async e => {
        e.preventDefault();
        const fd = new FormData();
        for (let k in form) fd.append(k, form[k]);
        await savePost(fd);
        window.location.href = '/';
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" required />
            <textarea value={form.content} onChange={e=>setForm({...form, content:e.target.value})} placeholder="Content" required />
            <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} required>
                <option value="">Choose category</option>
                {cats.map(c=><option key={c._id} value={c._id}>{c._id}</option>)}
            </select>
            <input type="file" onChange={e=>setForm({...form, featuredImage:e.target.files[0]})} />
            <button disabled={loading}>{ editId ? 'Update' : 'Create' }</button>
            {error && <p>Error: {error}</p>}
        </form>
    );
}

