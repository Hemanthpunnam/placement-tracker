# Placement Tracker – Full Stack Project

A beginner-friendly full stack application to track job and internship applications.

## Features

- Add a job application
- View all applications
- Update application status
- Delete an application
- Filter applications by status
- View dashboard statistics
- Responsive design
- Express REST API
- Local JSON file storage

## Technology Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Storage: JSON file
- Version Control: Git and GitHub

## Project Structure

```text
placement-tracker/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

## Run the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

## Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Build full stack placement tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/placement-tracker.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.
