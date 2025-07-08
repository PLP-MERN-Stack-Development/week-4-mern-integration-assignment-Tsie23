import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PostList from './pages/PostList';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import { useParams } from 'react-router-dom';

function EditPostWrapper(){
    const { id } = URLSearchParamsms();
    return <PostForm editId={id} />;
}


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/post/:id" element={<PostView />} />
                    <Route path="/create" element={<PostForm />} />
                    <Route path="/edit/:id" element={<EditPostWrapper />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

