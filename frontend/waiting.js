const socket = new WebSocket(`ws://${location.hostname}:8082/${encodeURIComponent(nick)}`);

socket.addEventListener("message", () => {
    location.replace(`/board.html?table=${encodeURIComponent(nick)}`);
});