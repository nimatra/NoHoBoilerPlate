import { greet } from "./components/greet";

function showHello(divName: string, name: string = null) {
    const div = document.getElementById(divName);
    div.innerText = greet(name);
}

showHello("greeting");
