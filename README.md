# The Final Blog
A blog platform built with the MERN stack (MongoDB, Express, React, Node.js). This project features delete and edit protections, dynamic theme switching, and a separate look for mobile users.

## Tech Stack
Frontend: React, React Router, Axios

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

API Testing: Postman

Deployment: Render (Backend), Netlify (Frontend)

Styling: CSS3

## Key Features
Delete and Edit Protection

Actions like Delete and Edit trigger a password prompt.

The password is sent via a custom header.

The Backend validates this against a secret variable before allowing changes.

Dynamic Theme Engine
 Dark Mode/Light Mode toggle.

Saves your choice so it stays the same when you refresh.

Uses CSS variables for instant switching.

Mobile Responsive
The layout changes on smaller screens to stack the menu and buttons vertically so it is easy to use on a phone.

# How to Run on Localhost
Clone the repository: https://github.com/HomelessEd/final-project

## Setup Backend:

Go to the /backend folder.

Create a file named .env

Add these lines inside it:
MONGO_URI=your_mongodb_link
PORT=3000
ADMIN_PASSWORD=your_password

Run "npm install" then "npm start"

## Setup Frontend:

Go to the /frontend folder.

Create a file named .env

Add this line inside it:
VITE_API_URL=http://localhost:3000

Run "npm install" then "npm run dev"