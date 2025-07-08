import api from "./api";

export const register = data => api.post('/auth/register', data).then(r=>r.data);
export const login = data => api.post('/auth/login', data).then(r=>r.data);
export const logout = () => { localStorage.clear(); };
export const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));




