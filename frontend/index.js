const board = document.getElementById("board");

for (let row = 0; row < 8; ++row) {
    const row = document.createElement("tr");
    for (let col = 0; col < 8; ++col) {
        const square = document.createElement("td");
        row.append(square);
    }
    board.append(row);
}