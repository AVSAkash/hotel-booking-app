# AVS Hotels – Full Stack Hotel Booking Website

A full-stack web application for hotel booking built with Node.js, Express, MongoDB, and EJS.  
Users can create listings, search and filter hotels, view details with maps, leave reviews, and securely manage their accounts with authentication and authorization.

---

## Features
- User Authentication – Register, login, and manage sessions with Passport.js
- Hotel Listings – Create, edit, and delete hotel listings with images
- Geolocation Support – Location search powered by Node Geocoder + Map integration
- Reviews System – Add, edit, and delete reviews with author validation
- Authorization – Only owners can edit/delete their listings
- Search & Filters – Search hotels by title/location, filter by categories, and sort by price
- Image Uploads – Cloudinary integration for storing listing images
- Responsive UI – Clean design with EJS, CSS, and FontAwesome
- Flash Messages – User feedback using connect-flash

---

## Tech Stack
- Frontend: EJS, HTML, CSS, JavaScript, Bootstrap/Tailwind
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Authentication: Passport.js (Local Strategy)
- File Storage: Cloudinary (with Multer for uploads)
- Session Store: MongoDB (connect-mongo)
- Geocoding: Node Geocoder (OpenStreetMap provider)

---

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/avs-hotels.git
   cd avs-hotels
   
