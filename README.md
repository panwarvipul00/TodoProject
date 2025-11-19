This is a simple full-stack Todo application built as part of an assignment.
The main idea was to create a basic login system and allow users to manage their own todo list. I tried to keep the project clean, minimal, and easy to understand.
# Tech Stack Used
# Frontend-
-React(TypeScript)
-Vite
-Tailwind CSS
-Zustand(state management)
-React router
# Backend-
-Node.js + Express (TypeScript)
-MongoDB Atlas
-JWT Authentication
# Features-
# User-
-Signup
-Login
-Token used for authentication(JWT)
-At first user need to signup then user can login using their credentials like email and password.
# TODO-
-Add new todo
-Mark complete / incomplete
-Delete todo
-Fetch logged-in user’s todos only
-User can easily add and delete todo with the functionality of mark complete and incomplete. It fetch logged-in user's todos only .It fetch todo data from database.
-As a user do signup ,user's save into database and user can login and do operations like add and delete todo ,it all will save to database as particular user todos.

# How to run project
# Backend-
cd backend
npm install
npm run dev
-You need to create a .env file in backend like below  -
MONGO_URI=your-atlas-url
JWT_SECRET=your-secret
PORT=4000
# Frontend
cd frontend
npm install
npm run dev


# Developed By-
Vipul Panwar




