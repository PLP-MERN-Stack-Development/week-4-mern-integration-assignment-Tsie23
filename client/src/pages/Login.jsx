import { useState, useContext } from "react";
import { authService } from "../services/api";
import useApi from "../hooks/useApi";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { loginUser } = useContext(AuthContext);
    const { call, loading, error } = useApi(authService.login);
    const [form, setForm] = useState({ email:'', password:''});

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await call(form);
        loginUser(data);
        window.location.href = '/';
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} required />
            <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} required />
            <button disabled={loading}>Login</button>
            {error && <p>Error: {error}</p>}
        </form>
    );
}

