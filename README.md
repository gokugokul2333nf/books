
**Bookmark Saver** is a full-stack MERN web app I built to help users save and organize their favorite links. It includes user authentication, tagging, search, and a clean UI using Ant Design — all focused on making bookmarking simple and useful.

##  Key Features

* 1 Secure login/signup using JWT
* 2 Add new bookmarks with title, URL, notes, and tags
* 3 Edit or delete bookmarks anytime
* 4 Mark important ones as favorites
* 5 Search by title or filter by tags
* 6 Clean, responsive UI built with Ant Design

---

## Tech Stack

**Frontend**
React.js (with Vite) + Ant Design + CSS

**Backend**
Node.js + Express.js + MongoDB

**Authentication**
JWT-based token storage (handled via `localStorage`)

---

## How to Run It Locally

### Backend setup:

```bash
cd backend
npm install
npm run dev
```

### Frontend setup:

```bash
cd frontend
npm install
npm run dev
```

 **Note:** Make sure MongoDB is running on your machine and the backend URL in your frontend matches.

---

##  What I Learned

While building this app, I really got a deeper understanding of how **JWT authentication** works in real-world projects. I learned to create protected routes, manage user-specific data securely, and handle sessions cleanly using tokens. It was also a good chance to get hands-on with Ant Design components and enhance the UI/UX.

---
## saftey-and- security

helmet htp header
xss
sanitise
rate limit

---

## What I Want to Improve Next

* Integrate Google OAuth login
* Make it fully mobile-optimized
* Add Open Graph link previews
* Allow users to export bookmarks (CSV/JSON)


