# HouseHunt
# 🏠 HouseHunt – Real Estate Property Rental & Management Platform

HouseHunt is a full-stack web application designed to simplify the property rental process. It allows **renters** to browse properties, **owners** to list their spaces, and **admins** to manage user roles and listings.

---

## 🚀 Features

### 👤 User Roles:
- **Renter:** Can view and book available properties.
- **Owner:** Can register and list properties for rent or sale.
- **Admin:** Has the ability to grant access to owners and manage listings and users.

### 🏘️ Property Listings:
- Add property type, ad type (Rent/Sale), amount, location, and upload images.
- Owners can manage (edit/delete) their listings.

### 🔐 Authentication:
- Secure user registration and login with role-based access.
- Owner access needs admin approval via grant.

### 💬 Chat System:
- Renter and owner can communicate via in-app chat.

### 📦 Booking System:
- Renters can submit booking requests.
- Owners/Admins can update booking statuses (Pending → Booked).

### 🎨 Dark Theme UI:
- Clean, modern interface with a professional dark color palette:
  - `#1e1e1e` (background)
  - `#2a2a2a` (inputs)
  - `#e0e0e0` (text)
  - `#4e9eff` (accent/borders)

---

## 🛠️ Tech Stack

### ⚙️ Backend:
- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- RESTful APIs
- JWT-based Authentication

### 🌐 Frontend:
- **React.js** (with Hooks)
- **React Router**, **React Bootstrap**, **Material UI**
- Ant Design components (notifications, etc.)

---

## 📁 Project Structure

      HouseHunt/
      ├── backend/ # Express API with MongoDB
      │ ├── models/ # Mongoose Schemas
      │ ├── routes/ # API routes
      │ └── controllers/ # Business logic
      ├── frontend/ # React Frontend
      │ ├── components/ # Reusable UI Components
      │ ├── modules/ # Role-based Modules
      │ ├── services/ # Axios API service files
      │ ├── App.js # Main App Routing
      │ └── App.css # Theme and global styles
      ├── public/
      ├── README.md

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Git

### 🔧 Backend Setup
  cd backend
  npm install

Create a .env file in the backend/ folder with the following:
  PORT=8001
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret

###Start the server:
  npm start

###🌐 Frontend Setup

  cd frontend
  npm install
  npm start
Your app will now be running at http://localhost:3000/.





