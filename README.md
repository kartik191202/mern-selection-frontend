# Webees Website - Full Stack Application

A complete full-stack web application with a landing page and admin panel built using React.js, Node.js, Express, and MongoDB.

## 🚀 Features

### Landing Page
- ✅ **Our Projects Section** - Displays all projects fetched from backend
- ✅ **Happy Clients Section** - Shows client testimonials with images
- ✅ **Contact Form** - Users can submit inquiries
- ✅ **Newsletter Subscription** - Email subscription functionality
- ✅ Responsive design for all devices

### Admin Panel
- ✅ **Project Management** - Add projects with images, names, and descriptions
- ✅ **Client Management** - Add client testimonials with images and designations
- ✅ **Contact Form Viewer** - View all contact form submissions
- ✅ **Newsletter Viewer** - View all email subscriptions
- ✅ Easy-to-use interface with tab navigation

## 📁 Project Structure

```
Webees-project/
│
├── backend/
│   ├── server.js              # Express server and API routes
│   ├── package.json           # Backend dependencies
│   └── uploads/               # Folder for uploaded images
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── LandingPage.jsx      # Landing page component
    │   │   ├── LandingPage.css      # Landing page styles
    │   │   ├── AdminPanel.jsx       # Admin panel component
    │   │   └── AdminPanel.css       # Admin panel styles
    │   ├── App.js                   # Main app with routing
    │   ├── App.css                  # App styles
    │   ├── index.js                 # React entry point
    │   └── index.css                # Global styles
    └── package.json                 # Frontend dependencies
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### Step 1: Clone or Create Project

```bash
mkdir Webees-project
cd Webees-project
```

### Step 2: Backend Setup

```bash
# Create and navigate to backend folder
mkdir backend
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mongoose cors multer

# Create uploads folder
mkdir uploads

# Create server.js and paste the backend code
```

**Start MongoDB:**
```bash
# Open a new terminal and run:
mongod
```

**Start Backend Server:**
```bash
node server.js
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate back to project root
cd ..

# Create React app
npx create-react-app frontend
cd frontend

# Install additional dependencies
npm install axios react-router-dom

# Create components folder
mkdir src/components
```

**Create the following files in src/components/:**
1. `LandingPage.jsx` - Copy the landing page component code
2. `LandingPage.css` - Copy the landing page CSS
3. `AdminPanel.jsx` - Copy the admin panel component code
4. `AdminPanel.css` - Copy the admin panel CSS

**Update these files in src/:**
1. `App.js` - Copy the App.js code with routing
2. `App.css` - Copy the App.css code
3. `index.js` - Copy the index.js code
4. `index.css` - Copy the index.css code

**Start Frontend:**
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🎯 Usage Guide

### For Users (Landing Page)

1. **Browse Projects**: Scroll to the "Our Projects" section to view all projects
2. **Read Testimonials**: Check out the "Happy Clients" section for client reviews
3. **Contact**: Fill out the contact form with your details and submit
4. **Subscribe**: Enter your email in the newsletter section and click subscribe

### For Admins (Admin Panel)

Access: Click the "Admin Panel" button (bottom-right) or go to `http://localhost:3000/admin`

#### Adding a Project
1. Click "Add Project" in the sidebar
2. Enter project name
3. Enter project description
4. Upload project image
5. Click "Add Project" button

#### Adding a Client
1. Click "Add Client" in the sidebar
2. Enter client name
3. Enter client testimonial/description
4. Enter designation (e.g., CEO, Designer)
5. Upload client photo
6. Click "Add Client" button

#### Viewing Contact Forms
1. Click "Contact Forms" in the sidebar
2. View all submissions with:
   - Full Name
   - Email Address
   - Mobile Number
   - City
   - Submission Date

#### Viewing Newsletter Subscriptions
1. Click "Newsletters" in the sidebar
2. View all subscribed email addresses with subscription dates

## 🔌 API Endpoints

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Add new project (with image) |
| GET | `/api/projects` | Get all projects |

### Clients
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/clients` | Add new client (with image) |
| GET | `/api/clients` | Get all clients |

### Contact Forms
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | Get all submissions |

### Newsletter
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/newsletters` | Get all subscriptions |

## 🗄️ Database Schema

### Project Schema
```javascript
{
  name: String,
  description: String,
  image: String,
  createdAt: Date
}
```

### Client Schema
```javascript
{
  name: String,
  description: String,
  designation: String,
  image: String,
  createdAt: Date
}
```

### Contact Schema
```javascript
{
  fullName: String,
  email: String,
  mobile: String,
  city: String,
  createdAt: Date
}
```

### Newsletter Schema
```javascript
{
  email: String,
  createdAt: Date
}
```

## 🎨 Design Features

- Clean and modern UI
- Responsive design (mobile, tablet, desktop)
- Color scheme matching reference images
- Smooth transitions and hover effects
- Professional typography
- User-friendly forms with validation

## 📝 Code Quality

- Beginner-friendly code structure
- Clear variable and function naming
- Commented sections for better understanding
- Modular component structure
- Separation of concerns (frontend/backend)
- Error handling included

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB service
sudo service mongodb start
```

### Port Already in Use
```bash
# Backend (port 5000)
# Kill process using port 5000
kill -9 $(lsof -t -i:5000)

# Frontend (port 3000)
# Kill process using port 3000
kill -9 $(lsof -t -i:3000)
```

### CORS Error
- Make sure backend server is running on port 5000
- Check that CORS is enabled in server.js

### Image Upload Issues
- Ensure `uploads` folder exists in backend directory
- Check file permissions on uploads folder
- Verify multer configuration in server.js

## 🌟 Additional Features (Bonus)

### Image Cropping
To implement image cropping before upload:

```bash
cd frontend
npm install react-image-crop
```

Then add cropping functionality in admin forms before submitting images.

### Sample Implementation:
```javascript
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Add crop state and implement cropping logic
// Crop images to 450x350 ratio before upload
```

## 📸 Screenshots

The application follows the reference images provided:
1. Projects displayed in grid layout with images
2. Client testimonials with circular profile pictures
3. Contact form with clean input fields
4. Newsletter subscription in footer
5. Admin panel with sidebar navigation

## 🤝 Contributing

This project is designed for learning purposes. Feel free to:
- Add new features
- Improve the UI/UX
- Optimize the code
- Add authentication for admin panel
- Implement edit/delete functionality

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a full-stack Webees demonstration project.

## 🙏 Acknowledgments

- Reference images provided for UI design
- React.js documentation
- Express.js documentation
- MongoDB documentation

---

**Happy Coding! 🚀**