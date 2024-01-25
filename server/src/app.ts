
import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config();
console.log(process.env.MONGODB_URI);

const app: Express = express()

const PORT: string | number = process.env.PORT || 5500

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };
  
app.use(cors(corsOptions));  
app.use(express.static(path.join(__dirname, 'my-app')))
app.use(todoRoutes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-app/public', 'index.html'));
  });
  

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error('MONGODB_URI is not set');
   } 
mongoose.connect(uri).then(() => {
    console.log('MongoDB database connection established successfully');
}).catch((err) => {
    console.log('Error connecting to MongoDB database: ', err);
});


mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
