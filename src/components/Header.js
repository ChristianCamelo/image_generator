import React from "react";
import placeholder from "../images/placeholder.webp"

export default function Header() {
    return (
        <div className="Header">
            <div className="container">
                <a><img className="logo" alt="logo" src={placeholder}></img></a>
                <div>
                    <p>Bienvenido <strong>Jose Joaquin</strong></p>
                    <button type="submit">Salir</button>
                </div>
            </div>
        </div>
    )
}