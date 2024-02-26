import React from "react";
import { getInteraction } from "../dependencies/commands";
import { postImagine, getResults, getStatus } from "../dependencies/commands.js"; // Asegúrate de importar las funciones necesarias
import downloadicon from "../images/save.png"
import lupaicon from "../images/lupa.png"

export default function ImagenUI({ prompt }) {

    const handleDownload = (e) => {
        e.preventDefault();
        fetch(prompt.image)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'imagen_resultado.jpg');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => console.error('Error al descargar la imagen:', error));
    };

    return (
        <div className="ImagenUI">
            <form>
                <div className="Imagen-btn">
                    <button className="save-btn" onClick={handleDownload}><img src={downloadicon}></img></button>
                </div>
            </form>
        </div>
    );
}