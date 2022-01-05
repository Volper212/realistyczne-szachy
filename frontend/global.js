let nick = localStorage.getItem("nick");
while (!nick) {
    nick = prompt("Podaj nick");
    localStorage.setItem("nick", nick);
}

function postToApi(path, data) {
    fetch(`/api/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

async function getFromApi(path) {
    const response = await fetch(`/api/${path}`);
    return response.json();
}