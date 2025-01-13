const express = require('express');
const rootRouter = require('./routes/index')
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: 'https://e-commerce-two-virid.vercel.app', // Frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});


app.use("/api/v1", rootRouter);

app.listen(3000);