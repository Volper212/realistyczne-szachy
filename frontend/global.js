let nick = localStorage.getItem("nick");
while (!nick) {
    nick = prompt("Podaj nick");
    localStorage.setItem("nick", nick);
}