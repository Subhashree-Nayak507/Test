import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/db.js';
import router from './routes/FormRoute.js';

dotenv.config();
const app = express();

app.use('/api',router);

const PORT= process.env.PORT || 5000
app.listen(PORT,()=>{
    connectDb();
    console.log(` server running in  http://localhost:${PORT}`);
});