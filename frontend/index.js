if (location.hash === "#opponent-left") {
    history.replaceState({}, document.title, location.href.split('#')[0]);
    alert("Twój przeciwnik opuścił grę.");
}

const tables = document.getElementById("tables");

const socket = new WebSocket(`ws://${location.hostname}:8081`);

socket.addEventListener("message", ({ data }) => {
    tables.innerHTML = "";
    for (const table of JSON.parse(data)) {
        if (table === nick) {
            location.replace("/waiting.html");
        }

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `board.html?table=${encodeURIComponent(table)}`;
        a.textContent = table;
        li.append(a);
        tables.append(li);
    }
});

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
    localStorage.removeItem("nick");
});
