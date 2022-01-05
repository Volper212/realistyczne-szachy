const tables = document.getElementById("tables");

getFromApi("tables").then((data) => {
    for (const table of data) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `board.html?table=${encodeURIComponent(table)}`;
        a.textContent = table;
        li.append(a);
        tables.append(li);
    }
});
