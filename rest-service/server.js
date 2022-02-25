
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

const app = express();
dotenv.config();

app.use(express.json())
app.use(cors());

app.use('/version', (req, res, next) => {
    res.status(200).send("1.0.0")
})

app.use('/api/v0/', apiRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
    app.emit("App Started")
});