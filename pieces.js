export const pieces = [
    ...Array.from({ length: 8 }, (_, i) => ({
        color: "white",
        type: "pawn",
        position: {
            row: 1,
            col: i,
        },
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