# manimbo-server

Backend for Lab Activity 7 (MERN). Powers user authentication and article CRUD for the `manimbo-client` frontend.

## Setup

```powershell
npm install
```

Create a `.env` file (see `.env.example`) with your MongoDB URI, port, and JWT secret.

## Run

```powershell
npm run dev   # nodemon
npm start     # node
```

The server starts on `http://localhost:8000` by default.

## REST endpoints

### Users (`/api/users`)
- `GET    /api/users`           list users (no password)
- `POST   /api/users`           create user (password is hashed)
- `PUT    /api/users/:id`       update user (password hashed if provided)
- `DELETE /api/users/:id`       delete user
- `POST   /api/users/login`     login, returns `{ token, type, firstName, ... }`

### Articles (`/api/articles`)
- `GET    /api/articles`            list articles (sorted newest first)
- `GET    /api/articles/slug/:slug` fetch article by slug
- `POST   /api/articles`            create article (auto-slugs from title)
- `PUT    /api/articles/:id`        update article
- `DELETE /api/articles/:id`        delete article
- `PATCH  /api/articles/:id/toggle` toggle `isActive`
