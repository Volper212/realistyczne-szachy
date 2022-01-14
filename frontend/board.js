postToApi("join-table", {
    table: new URLSearchParams(location.search).get("table"),
});

const board = document.getElementById("board");

for (let row = 0; row < 8; ++row) {
    const row = document.createElement("tr");
    for (let col = 0; col < 8; ++col) {
        const square = document.createElement("td");
        row.append(square);
    }
    board.append(row);
}

const piecesElement = document.getElementById("pieces");
const pieces = [
    ...Array.from({ length: 8 }, (_, i) => ({
        color: "white",
        type: "pawn",
        position: {
            row: 1,
            col: i,
        }
    })),
    {
        color: "white",
        type: "rook",
        position: {
            row: 0,
            col: 0,
        },
    },
    {
        color: "white",
        type: "knight",
        position: {
            row: 0,
            col: 1,
        },
    },
    {
        color: "white",
        type: "bishop",
        position: {
            row: 0,
            col: 2,
        },
    },
    {
        color: "white",
        type: "queen",
        position: {
            row: 0,
            col: 3,
        },
    },
    {
        color: "white",
        type: "king",
        position: {
            row: 0,
            col: 4,
        },
    },
    {
        color: "white",
        type: "bishop",
        position: {
            row: 0,
            col: 5,
        },
    },
    {
        color: "white",
        type: "knight",
        position: {
            row: 0,
            col: 6,
        },
    },
    {
        color: "white",
        type: "rook",
        position: {
            row: 0,
            col: 7,
        },
    },
    ...Array.from({ length: 8 }, (_, i) => ({
        color: "black",
        type: "pawn",
        position: {
            row: 6,
            col: i,
        },
    })),
    {
        color: "black",
        type: "rook",
        position: {
            row: 7,
            col: 0,
        },
    },
    {
        color: "black",
        type: "knight",
        position: {
            row: 7,
            col: 1,
        },
    },
    {
        color: "black",
        type: "bishop",
        position: {
            row: 7,
            col: 2,
        },
    },
    {
        color: "black",
        type: "queen",
        position: {
            row: 7,
            col: 3,
        },
    },
    {
        color: "black",
        type: "king",
        position: {
            row: 7,
            col: 4,
        },
    },
    {
        color: "black",
        type: "bishop",
        position: {
            row: 7,
            col: 5,
        },
    },
    {
        color: "black",
        type: "knight",
        position: {
            row: 7,
            col: 6,
        },
    },
    {
        color: "black",
        type: "rook",
        position: {
            row: 7,
            col: 7,
        },
    },
];

for (const { color, type, position } of pieces) {
    const pieceElement = document.createElement("img");
    pieceElement.src = `/pieces/${color}/${type}.jpg`;
    pieceElement.style.setProperty("bottom", `${position.row * 12.5 + Math.random() * 2.5}%`);
    pieceElement.style.setProperty("left", `${position.col * 12.5 + Math.random() * 2.5}%`);
    piecesElement.append(pieceElement);
}
