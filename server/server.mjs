import express from 'express';
import fetch from 'node-fetch';
import FormData from 'form-data';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 1
    }
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// FreeImage.Host upload function
async function uploadToFreeImageHost(fileBuffer) {
    const form = new FormData();
    form.append('source', fileBuffer, { filename: 'upload.jpg' });

    const response = await fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', {
        method: 'POST',
        body: form
    });

    const json = await response.json();
    
    if (!json.image?.url) {
        throw new Error(json.error?.message || "FreeImage.Host upload failed");
    }
    
    return json.image.url;
}

// Ghibli API processing
async function processWithGhibliAPI(imageUrl, prompt) {
    const ghibliApiUrl = 'https://betadash-api-swordslush-production.up.railway.app/ghibli';
    const params = new URLSearchParams({ 
        imageUrl: imageUrl,
        prompt: prompt || ''
    });

    const response = await fetch(`${ghibliApiUrl}?${params}`);
    const data = await response.json();
    
    if (!data.imageUrl) {
        throw new Error(data.error || "Ghibli API processing failed");
    }
    
    return {
        imageUrl: data.imageUrl,
        author: data.author || "Studio Ghibli AI"
    };
    }

// API endpoint
app.post('/api/generate', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("Please upload an image file");
        }

        // Validate file type
        if (!req.file.mimetype.startsWith('image/')) {
            throw new Error("Only image files are allowed");
        }

        // 1. Upload to image host
        const uploadedUrl = await uploadToFreeImageHost(req.file.buffer);
        console.log("Image uploaded to:", uploadedUrl);

        // 2. Process with Ghibli API
        const { imageUrl, author } = await processWithGhibliAPI(uploadedUrl, req.body.prompt);
        console.log("Ghibli transformation successful");

        // 3. Return result
        res.json({ 
        success: true,
        result: imageUrl,
        author: author
        });

    } catch (error) {
        console.error("Error in /generate:", error.message);
        res.status(500).json({ 
        success: false,
        error: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
