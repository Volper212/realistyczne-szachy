if (location.hash === "#opponent-left") {
    history.replaceState({}, document.title, location.href.split('#')[0]);
    alert("Twój przeciwnik opuścił grę.");
}

if (location.hash === "#no-game") {
    history.replaceState({}, document.title, location.href.split('#')[0]);
    alert("Nie znaleziono partii");
}

const tables = $("#tables");

const socket = new WebSocket(`ws://${location.hostname}:8081`);

socket.addEventListener("message", ({ data }) => {
    tables.innerHTML = "";
    for (const table of JSON.parse(data)) {
        const li = $("<li></li>");
        const a = $("<a></a>");
        a.attr("href", `board.html?table=${encodeURIComponent(table)}`);
        a.text(table);
        li.append(a);
        tables.append(li);
    }
});

const logout = $("#logout");

logout.click(() => {
    localStorage.removeItem("nick");
});
