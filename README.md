[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19896905&assignment_repo_type=AssignmentRepo)
# MERN Blog Application

## Project Overview
A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with authentication, CRUD for posts, categories, image upload, comments, pagination, search, and more.

## Features
- User registration and login (JWT-based)
- Create, read, update, delete blog posts
- Image upload for posts
- Categories for posts
- Comment on posts
- Pagination and search for posts
- Protected routes for authenticated actions
- Responsive React frontend

## Directory Structure
```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Setup Instructions
### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- pnpm (recommended)

### 1. Clone the repository
```
git clone <your-repo-url>
cd <repo-root>
```

### 2. Configure Environment Variables
- Copy `.env.example` to `.env` in both `server/` and `client/` and fill in values as needed.

#### Example for `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```
#### Example for `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies
```
cd server
pnpm install
cd ../client
pnpm install
```

### 4. Start Development Servers
```
# In server/
pnpm run dev
# In client/
pnpm run dev
```

### 5. Access the App
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

## API Documentation
### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user

### Posts
- `GET /api/posts` — List posts (pagination: `?page=1&limit=5`)
- `GET /api/posts/:id` — Get single post
- `POST /api/posts` — Create post (auth, multipart/form-data)
- `PUT /api/posts/:id` — Update post (auth)
- `DELETE /api/posts/:id` — Delete post (auth)
- `GET /api/posts/search?q=term` — Search posts
- `GET /api/posts/:id/comments` — Get comments for post
- `POST /api/posts/:id/comments` — Add comment (auth)

### Categories
- `GET /api/categories` — List categories
- `POST /api/categories` — Create category (auth)

## Testing the Project
1. Register a user and login.
2. Create categories and posts (with images).
3. Add, edit, delete posts.
4. Add comments to posts.
5. Test pagination and search in the post list.
6. Try protected routes (create/edit/delete) as logged in/out user.

## Deployment Guide
1. Set up MongoDB Atlas or a production MongoDB instance.
2. Set environment variables in production (`.env` files).
3. Build the React app:
   ```
   cd client
   pnpm run build
   ```
4. Serve the build with a static server or configure your Express server to serve the frontend build.
5. Deploy the backend (e.g., Heroku, Render, DigitalOcean, etc.).
6. Point your frontend to the deployed backend API URL.

## Screenshots
(Add screenshots of your app here)

## License
MIT 