import express from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const PORT = process.env.PORT || 3000;
const ACCEPTED_TYPES = /\.(jpeg|png|gif)$/i;
// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UPLOADS_DIR = path.join(import.meta.dirname, '../uploads');

const app = express();
app.use(cors({origin: 'http://localhost:5173'})); //allow our app to request resources
app.use('/uploads', express.static(UPLOADS_DIR));

// Search based on query param
app.get('/api/images', (req: Request, res: Response) => {
    const files = fs.readdirSync(UPLOADS_DIR)
        .filter((file) => ACCEPTED_TYPES.test(file))
        .filter(file => file.includes(req.query.search as string || ''));
    const images = files.map(file => ({
        filename: file,
        url: `/uploads/${file}`
    }));
    res.json(images);
})

// Upload referenced https://medium.com/@pirson/uploading-files-in-express-js-using-multer-ff8fa5900d15
//Following code snippet copied from link 
///////////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// Route for file upload
app.post('/api/images', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded!');
  }
  res.status(200).json(`File uploaded successfully! Filename: ${req.file.filename}`);
});
//////////////End of copied code snippet

// Delete
app.delete('/api/images/:filename', (req: Request, res: Response) => {
    const deletePath = path.join(UPLOADS_DIR, path.basename(req.params.filename as string));
    if (fs.existsSync(deletePath)) {
        fs.unlinkSync(deletePath);
        res.json('File deleted');
    } else {
        res.status(404).send('File not found');
    }
});

// Error handling (Placeholder for now put it in the console)
app.use((err: unknown, req: Request, res: Response, next: Function) => {
    console.error(err);
    res.status(500).send('Server Error');
});

//Tested using curl https://curl.se/docs/tutorial.html
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});