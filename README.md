# File Upload System with GridFS

This is a MERN stack project that enables file upload, storage, and retrieval using MongoDB's GridFS. The backend is built with Node.js, Express, and Multer-GridFS-Storage, while the frontend uses React and Axios.

## Features
- Upload files to MongoDB using GridFS
- Retrieve and display uploaded files
- REST API endpoints for file management

## Technologies Used
### Backend:
- Node.js
- Express
- MongoDB (GridFS)
- Multer & Multer-GridFS-Storage
- Cors
- Dotenv

### Frontend:
- React
- Axios

## Installation & Setup

### Prerequisites:
- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection

### Backend Setup:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/file-upload-gridfs.git
   cd file-upload-gridfs/backend
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Create a `.env` file in the `backend` directory and add your MongoDB URI:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5002
   ```
4. Start the backend server:
   ```sh
   pnpm start
   ```

### Frontend Setup:
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the frontend development server:
   ```sh
   pnpm run dev
   ```

## API Endpoints
- **POST** `/files/upload` - Upload a file
- **GET** `/files/all` - Retrieve all uploaded files

## Issues & Troubleshooting
If you encounter issues such as `TypeError: Cannot read properties of undefined (reading '_id')`, ensure that:
- Your MongoDB connection is properly established.
- GridFSBucket is correctly initialized.
- Dependencies are up to date (`npm update`).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

---
Made with ❤️ by Mariem Jellibi 

