# News Management System - Frontend
React + Vite Application for News CRUD & Management

## Environment Variables
Create a `.env` file based on `.env.example`:
```env
VITE_API_URL=http://localhost:5000
```

In production, the frontend uses the same origin as the backend by default.
Set `VITE_API_URL` only when the API is hosted at a different public URL.

## Available Scripts
- `npm run dev`: Starts the local development server.
- `npm run build`: Builds the app for production (into `dist`).
- `npm run preview`: Locally previews the production build.
