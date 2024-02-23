import Canvas from "../components/Canvas";
import Header from "../components/Header";
import { getMessages, postImagine } from "../dependencies/commands";

export default function Workspace_Page() {
    const isLogged = document.cookie.split('.').length === 3;

    if (!isLogged) {
        window.location.href = '/home';
        return null; 
    }

    function getChat(){
        const token = document.cookie.split("=")[1];
        console.log(token)
        getMessages(token,(messages)=>{
            console.log("Front recibe: ",messages)
        })
    }

    function postPrompt(){
        const token = document.cookie.split("=")[1];
        const prompt = document.getElementById("prompt-input").value;
        postImagine(token,prompt,function(){})
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