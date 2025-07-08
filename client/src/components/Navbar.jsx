import { Link } from 'react-router-dom';
import { useContext  } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    return(
        <nav>
            <Link to= "/">Home</Link>
            {user
                ? <>
                    <Link to="/create">New Post</Link>
                    <button onClick={logoutUser}>Logout</button>
                </>
                :<Link to="/login">Login</Link>
            }
        </nav>
    );
}

