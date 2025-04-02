import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path, { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';
import  Grid  from 'gridfs-stream';
import {GridFsStorage} from 'multer-gridfs-storage';

dotenv.config();
const app = express();
//the middlewares
app.use(cors());
app.use(express.json());

//create the mongodb connection
const MONGO_URI = process.env.MONGO_URI;
const connection = mongoose.createConnection(MONGO_URI, () => {
    console.log('Connected to MongoDB successfully!!!!!');
});
//time too create the gridfs stream : is used for read and write files from mongodb 
let gridfs;
//the creation of the gridfs stream is done once the connection with the database is established 
// connection.once('open',() => {
//     gridfs = new Grid(connection.db,mongoose.mongo);
//     console.log('connected to the database');
//     gridfs.collection('uploads');

// });
connection.once("open", () => {
    gridfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: "uploads" });
    console.log("Connected to the database and initialized GridFSBucket.");
  });
  

//it is time to create the storage engine for multer
const storage = new GridFsStorage({
    url:MONGO_URI,
    file:(req,file)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buff)=>{
                if (err) return reject(err);
                const filename = buff.toString('hex')+path.extname(file.originalname);
                resolve({filename, bucketName:'uploads'});

            });
            });
        },
    
    });

const upload = multer({storage:storage});
// app.post("/files/upload", upload.single("file"), async (req, res) => {
//     console.log("Received file:", req.file); // Log file details
//     try {
//       if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }
//       console.log("File uploaded successfully:", req.file);
//       res.status(200).json({ file: req.file });
//     } catch (error) {
//       console.error("Upload error:", error);
//       res.status(500).json({ error: "File upload failed" });
//     }
//   });
app.post("/files/upload", upload.single("file"), (req, res) => {
    console.log('File uploaded:', req.file);  // Log the uploaded file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json({ file: req.file });
  });
vvvvvvv  
  
  app.get("/files/all", async (req, res) => {
    try {
      if (!gridfs) {
        return res.status(500).json({ error: "GridFS is not initialized" });
      }
      const cursor = gridfs.find({});
      const files = await cursor.toArray();
  
      if (!files || files.length === 0) {
        return res.status(404).json({ error: "No files found" });
      }
      res.status(200).json(files);
    } catch (error) {
      console.error("File retrieval error:", error);
      res.status(500).json({ error: "Failed to retrieve files" });
    }
  });
  

const PORT = process.env.PORT || 5002;
app.listen(PORT,console.log(`server started on port ${PORT}`));
    
