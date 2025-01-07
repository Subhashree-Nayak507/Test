import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/db.js';
import router from './routes/FormRoute.js';
import cors from 'cors';
import AuthRouter from './routes/UserRoutes.js';

dotenv.config();
const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );
  
app.use(express.json());
app.use(cookieParser());  

app.use('/api/auth',AuthRouter);
app.use('/api',router);

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    connectDb();
    console.log(`server running in  http://localhost:${PORT}`);
});