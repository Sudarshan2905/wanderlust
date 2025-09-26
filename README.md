# 🌍 Wanderlust – Airbnb Clone

A full-stack web application inspired by Airbnb.  
Built with **Node.js, Express, MongoDB, EJS, and Bootstrap**, featuring authentication, cloud image uploads, interactive maps, and review system.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas + Mongoose  
- **Authentication**: Passport.js (Local Strategy)  
- **Templating Engine**: EJS + EJS-Mate  
- **Frontend**: HTML, CSS, Bootstrap, FontAwesome  
- **Image Uploads**: Multer + Cloudinary  
- **Maps / GeoCoding**: Mapbox SDK  
- **Session & Flash**: express-session + connect-flash  

---

## ✨ Features

### 👤 User Authentication
- Sign Up, Login, Logout  
- Flash messages for success/error  

### 🏠 Listings (CRUD)
- Create new listings with **image upload + geocoding**  
- View all listings with **search + filters**  
- View single listing with owner & reviews  
- Edit / Delete listings (only by owner)  

### 📝 Reviews
- Add, edit, delete reviews  
- Linked with user & listing  

### 🔍 Search & Categories
- Search by **location** or **country**  
- Filter listings by categories (Trending, Castles, Rooms, etc.)  

### 🗺 Maps Integration
- Interactive Mapbox map  
- Markers & popups for listings  

---

## 📦 Models

- **User** → username, email, password (hashed)  
- **Listing** → title, description, price, image (Cloudinary), category, location, geometry, owner  
- **Review** → rating, comment, author, listing ref  

---

## 📂 Routes Overview

- `/listings` → all listings  
- `/listings/new` → create form  
- `/listings/:id` → show listing  
- `/listings/:id/edit` → edit listing  
- `/listings/:id/reviews` → review system  
- `/signup`, `/login`, `/logout` → authentication  

---

## ⚙️ Middleware

- `isLoggedIn` → checks authentication  
- `isOwner` → verifies listing ownership  
- `validateListing` → Joi schema validation  
- `saveRedirectUrl` → redirect after login  

---

## 🛠 Utilities

- `wrapAsync` → clean async error handling  
- `ExpressError` → custom error handler  

---

## 🌐 Deployment

This project is deployed on **Render**.  
👉 **Live Demo**: [https://wanderlust-cth0.onrender.com/listings](https://wanderlust-cth0.onrender.com/listings)  

---


## 📖 Summary

A **full-stack Airbnb-like app** with secure authentication, cloud-hosted database, image uploads, maps, reviews, and search + filter functionality.  
Perfect for learning **MERN + Cloud integration** and can be extended into a production-ready project.

---

## 👨‍💻 Author

**Sudarshan Prakash Herwade**  
- GitHub: [Sudarshan2905](https://github.com/Sudarshan2905)  
