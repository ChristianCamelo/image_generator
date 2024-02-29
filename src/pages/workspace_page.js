import Header from "../components/Header";
import Canvas from "../components/Canvas";
import { useEffect, useState } from "react";
import { getMessages, postImagine, getStatus, buildImages } from "../dependencies/commands";

export default function Workspace_Page() {

    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [prompts, setPrompts] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (!document.cookie.split(';').length === 2) {
            window.location.href = '/home';
        } else {
            const tokenValue = getCookie("token");
            const userValue = getCookie("user");
            setToken(tokenValue);
            setUser(userValue);
            if(userValue==="admin"){
                window.location.href = '/home';
            }
            document.getElementById("user-name").innerHTML = userValue;
            document.getElementById("error-prompt").style.display = "none";
        }
    }, []);

    useEffect(() => {
        if (token !== "") {
            getChat();
        }
    }, [token]);

    function getCookie(name) {
        const cookieValue = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith(name + '='))
            ?.split('=')[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }

    function getChat() {
        getMessages(token, async (messages) => {
            const newPrompts = await buildImages(messages);
            setPrompts(newPrompts);
        })
    }

    function readTags() {
        const tagsPrompt = 
        console.log("readTags : ",tagsPrompt)
        return tagsPrompt;
    }

    const updateTags = (newTags) => {
        setTags(newTags);
    };

    function postPrompt(e) {
        e.preventDefault();
        let data = {};
        if (document.getElementById("prompt").value !== "") {
            data.prompt = document.getElementById("prompt").value;
            data.tags = tags.join("$$");
            document.getElementById("error-prompt").style.display = "none";
            if (document.getElementById("negative").value !== "") {
                data.negative = document.getElementById("negative").value;
            }
            if (document.getElementById("creative").value !== 0) {
                data.creative = document.getElementById("creative").value;
            }
            if (document.getElementById("quality").value !== 0) {
                data.quality = document.getElementById("quality").value;
            }
            if (document.getElementById("style").value !== 0) {
                data.style = document.getElementById("style").value;
            }
            data.aspect = document.getElementById("aspect").value;
            postImagine(token, data, () =>
                getMessages(token, function (messages) {
                    console.log("Front recibe: ", messages)
                }))
        } else {
            document.getElementById("error-prompt").style.display = "block";
        }
    }

    return (
        <div className="container">
            <Header/>
            <Canvas prompts={prompts} postPrompt={postPrompt} tags={tags} updateTags={updateTags}/>
        </div>
    );
}
