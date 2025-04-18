📦 Inventory Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing inventory, customers, and orders. Built as part of an internship project, this system provides a seamless interface for real-time product tracking, customer management, and order processing.

🔧 Key Features
📋 Inventory Management

- Add, edit, and delete products

- Upload product images using AWS S3

- Filter and sort inventory by categories and status (Published, Unpublished)

- Real-time table updates with bulk actions and Excel export

👥 Customer Management

- View and manage customers

- Filter by status (Active, Inactive)

- Search customers and display related order statistics

🛒 Order Management

- Create and manage orders with tracking ID generation

- Filter orders by type and status

- View detailed order info and total amount

- Status update via dropdown (Pending, In-Progress, Completed)

🔒 Authentication & Security

- User registration and login with JWT authentication

- Forgot password with OTP-based email verification

- Profile image upload to AWS S3

📊 Dashboard Analytics

- Dynamic card filters (e.g., This Week, Last Week)

- Reusable table and filter components with real-time updates

🛠️ Tech Stack
- Frontend: React.js, Tailwind CSS

- Backend: Node.js, Express.js

- Database: MongoDB (with MongoDB Compass)

- Cloud: AWS S3 (image upload)

- Auth: JWT, bcrypt, nodemailer (for OTP)

- Real-time: Socket.IO (for chat/message feature)

- Export: ExcelJS for exporting selected data

