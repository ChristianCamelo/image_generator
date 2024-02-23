import Canvas from "../components/Canvas";
import Header from "../components/Header";
import { useEffect } from "react";
import { getMessages, postImagine, getStatus } from "../dependencies/commands";

export default function Workspace_Page() {

    let token =""
    let user = ""

    useEffect(() => {
        if (!document.cookie.split(';').length === 2) {
            window.location.href = '/home';
        } else {
            token = getCookie("token");
            user = getCookie("user");
            document.getElementById("user-name").innerHTML = getCookie("user");
        }
    }, []);

    function getCookie(name) {
        const cookieValue = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith(name + '='))
            ?.split('=')[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }

    function getChat() {
        console.log(token)
        getMessages(token, (messages) => {
            console.log("Front recibe: ", messages)
        })
    }

    function postPrompt() {
        const prompt = "hola";//document.getElementById("prompt-input").value;
        postImagine(token, prompt,
            getMessages(token, (messages) => {
                console.log("Front recibe: ", messages)
            }))
    }

    function checkLastPrompt() {
    }

    return (
        <div className="container">
            <button onClick={getChat}>Obtener mensajes</button>
            <button onClick={postPrompt}>Enviar prompt</button>
            <Header />
            <Canvas />
        </div>
    );
}