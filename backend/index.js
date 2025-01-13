const express = require('express');
const rootRouter = require('./routes/index')
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "https://e-commerce-two-virid.vercel.app",
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none'); // Allow communication
    next();
});


app.use("/api/v1", rootRouter);

app.listen(3000);