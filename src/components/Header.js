import React from "react";
import placeholder from "../images/placeholder.webp"
import { useNavigate } from "react-router-dom";
export default function Header() {

    const navigate = useNavigate();
    function exit(){
        let Cookies = document.cookie.split(';');
       for (var i = 0; i < Cookies.length; i++) {
          document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
       }
       navigate('/login');
    }
    return (
        <div className="Header">
            <div className="container">
                <p id="logo">Brander</p>
                <div>
                    <p>Bienvenido <strong id="user-name"></strong></p>
                    <button type="submit" onClick={exit}>Salir</button>
                </div>
            </div>
        </div>
    )
}