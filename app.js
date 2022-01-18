import express from "express";
import { WebSocketServer } from "ws";

const port = process.env.PORT || 3000;
const app = express();

const indexWss = new WebSocketServer({ port: 8081 });
const waitingWss = new WebSocketServer({ port: 8082 });

const waitingClients = new Map();

indexWss.on("connection", (client) => {
    sendTables(client);
});

app.use(express.static("frontend"));
app.use(express.json());

app.post("/api/join-table", (req, res) => {
    const { table } = req.body;
    const opponent = waitingClients.get(table);
    waitingClients.delete(table);
    opponent.send();
    for (const client of indexWss.clients) {
        sendTables(client);
    }
});

waitingWss.on("connection", (client, req) => {
    const table = decodeURIComponent(req.url.substring(1));
    waitingClients.set(table, client);
    for (const client of indexWss.clients) {
        sendTables(client);
    }

    client.on("close", () => {
        waitingClients.delete(table);
        for (const client of indexWss.clients) {
            sendTables(client);
        }
    });
});

function sendTables(client) {
    client.send(JSON.stringify([...waitingClients.keys()]));
}

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
