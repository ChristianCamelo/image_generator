import React from "react";
import History from "./History";

export default function Panel({ historial }) {
    console.log("Panel: Historial recibido", historial);

    return (
        <div className="Panel">
            <h3>Última generación</h3>
            {
                historial.map((prompt, index) => (
                    <History key={index} prompt={prompt} />
                ))
            }
            <a href="#"><p>Terminos y condiciones del servicio.</p></a>
        </div>
    );
}


