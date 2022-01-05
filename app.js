import express from "express";

const port = process.env.PORT || 3000;
const app = express();

const tables = new Set();

app.use(express.static("frontend"));
app.use(express.json());

app.get("/api/tables", (req, res) => {
    res.send([...tables]);
});

app.post("/api/add-table", (req, res) => {
    tables.add(req.body.nick);
});

app.post("/api/join-table", (req, res) => {
    tables.delete(req.body.table);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});