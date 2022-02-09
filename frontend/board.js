const table = new URLSearchParams(location.search).get("table");
const socket = new WebSocket(`ws://${location.hostname}:8083/${table}`);

const board = document.getElementById("board");

for (let row = 0; row < 8; ++row) {
    const row = document.createElement("tr");
    for (let col = 0; col < 8; ++col) {
        const square = document.createElement("td");
        row.append(square);
    }
    board.append(row);
}

const piecesDiv = document.getElementById("pieces");

socket.addEventListener("message", ({ data }) => {
    console.log(data);
    if (data === "leave") {
        location.replace("/#opponent-left");
    }
    if (data === "no game") {
        location.replace("/#no-game");
    }
    const input = JSON.parse(data);
    if (Array.isArray(input)) {
        input.forEach(({ color, type, x, y }, i) => {
            const piece = document.createElement("img");
            piece.src = `/pieces/${color}/${type}.jpg`;
            piece.draggable = false;
            piece.style.setProperty("transform", `translate(${x}px, ${y}px)`);
            piecesDiv.append(piece);

            const { offsetWidth: width, offsetHeight: height } = piece;

            piece.addEventListener("mousedown", () => {
                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", release);

                function release() {
                    document.removeEventListener("mousemove", move);
                    document.removeEventListener("mouseup", release);
                    socket.send(JSON.stringify({ x, y, i }));
                }
            });

            function move({ clientX, clientY }) {
                const { left, top } = board.getBoundingClientRect();
                x = clientX - left - width / 2;
                y = clientY - top - height / 2;
                piece.style.setProperty(
                    "transform",
                    `translate(${x}px, ${y}px)`
                );
            }
        });
    } else {
        const { x, y, i } = input;
        piecesDiv.children[i].style.setProperty(
            "transform",
            `translate(${x}px, ${y}px)`
        );
    }
});
