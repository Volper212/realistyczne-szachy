import express from "express";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("frontend"));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});