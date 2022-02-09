import express from "express";
import { WebSocketServer } from "ws";
import { pieces } from "./pieces.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("frontend"));
app.use(express.json());

const indexWss = new WebSocketServer({ port: 8081 });
const waitingWss = new WebSocketServer({ port: 8082 });
const boardWss = new WebSocketServer({ port: 8083 });

const waitingClients = new Map();
const boards = new Map();

indexWss.on("connection", sendTables);

boardWss.on("connection", async (player, req) => {
    const table = decodeURIComponent(req.url.substring(1));
    const waitingClient = waitingClients.get(table);
    if (waitingClient) {
        let resolve;
        const isGuestBlack = Math.random() < 0.5;
        boards.set(table, {
            isGuestBlack,
            guest: player,
            host: new Promise((_resolve) => {
                resolve = _resolve;
            }),
            pieces: pieces.map(({ position: { row, col }, ...piece }) => ({
                ...piece,
                x: ((col + Math.random() * 0.2) / 8) * 500,
                y: (1 - (row + Math.random() * 0.2 + 0.8) / 8) * 500,
            })),
            resolve,
        });
        waitingClient.send();
    } else {
        const board = boards.get(table);
        if (!board) {
            player.send("no game");
            return;
        }
        board.resolve(player);
    }
    {
        const { isGuestBlack, guest, host, pieces } = boards.get(table);
        const opponent = waitingClient ? await host : guest;
        if ((player === guest) === isGuestBlack) {
            player.send(JSON.stringify(pieces.map(flip)));
        } else {
            player.send(JSON.stringify(pieces));
        }
        player.on("message", (data) => {
            opponent.send(JSON.stringify(flip(JSON.parse(data.toString()))));
        });
        player.on("close", () => {
            opponent.send("leave");
            opponent.on("close", () => {
                boards.delete(table);
            });
        });
    }
});

function flip({ x, y, ...piece }) {
    return {
        ...piece,
        x: 450 - x,
        y: 450 - y,
    };
}

waitingWss.on("connection", (client, req) => {
    const table = decodeURIComponent(req.url.substring(1));
    waitingClients.set(table, client);
    updateTables();

    client.on("close", () => {
        waitingClients.delete(table);
        updateTables();
    });
});

function sendTables(client) {
    client.send(JSON.stringify([...waitingClients.keys()]));
}

function updateTables() {
    for (const client of indexWss.clients) {
        sendTables(client);
    }
}

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
