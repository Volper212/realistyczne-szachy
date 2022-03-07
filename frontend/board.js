const table = new URLSearchParams(location.search).get("table");
const socket = new WebSocket(`ws://${location.hostname}:8083/${table}`);

const board = $("#board");

for (let row = 0; row < 8; ++row) {
    const row = $("<tr></tr>");
    for (let col = 0; col < 8; ++col) {
        const square = $("<td></td>");
        row.append(square);
    }
    board.append(row);
}

const piecesDiv = $("#pieces");

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
            const piece = $(`<img src="/pieces/${color}/${type}.jpg" draggable="false" style="transform: translate(${x}px, ${y}px)">`);
            piecesDiv.append(piece);

            const width = piece.width();
            const height = piece.height();

            piece.mousedown(() => {
                $(document).mousemove(move);
                $(document).mouseup(release);

                function release() {
                    $(document).off("mousemove", move);
                    $(document).off("mouseup", release);
                    socket.send(JSON.stringify({ x, y, i }));
                }
            });

            function move({ clientX, clientY }) {
                const { left, top } = board.offset();
                x = clientX - left - width / 2;
                y = clientY - top - height / 2;
                piece.css("transform", `translate(${x}px, ${y}px)`);
            }
        });
    } else {
        const { x, y, i } = input;
        $(piecesDiv.children()[i]).css("transform", `translate(${x}px, ${y}px)`);
    }
});
