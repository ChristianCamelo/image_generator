import React from "react";
import { getInteraction } from "../dependencies/commands";
import { postImagine, getResults, getStatus } from "../dependencies/commands.js"; // Asegúrate de importar las funciones necesarias


export default function ImagenUI({ imagen }) {
    // Función para manejar el clic en los botones
    const handleButtonClick = async (option) => {
        try {
            console.log("ImagenUI: Pidiendo la opcion: " + option + " / Imagen: " + imagen);
            //const result = await getInteraction(option, imagen); // Cambia "imagen" por la imagen que deseas pasar

            let botones = document.getElementsByClassName('ImagenUI');
            for (let i = 0; i < botones.length; i++) {
                botones[i].style.display = "none";
            }

            async function checkResults() {
                return new Promise((resolve, reject) => {
                    const intervalId = setInterval(async () => {
                        const { status, progress, image } = await getStatus();
                        console.log(status + "/ " + progress + "/ " + image)
                        if (status === true) {

                            let downloadButton = document.getElementById('btn-download').download = image;
                            clearInterval(intervalId);
                            let resultado = document.getElementById('resultado').src = image;
                            resolve();
                        }
                    }, 3000); // Ejecutar cada 3 segundos (3000 milisegundos)
                });
            }
            checkResults().then(async () => {
                console.log('ImagenUI: Resultados obtenidos. Ejecutando código adicional...');
            });

        } catch (error) {
            console.error("ImagenUI: Error al interactuar:", error);
        }
    };

    return (
        <div className="ImagenUI">
            <form>
                {/* Agrega el controlador de eventos onClick a cada botón */}
                {/* <button type="button" onClick={() => handleButtonClick(1)}>A</button> */}
                <button type="button" onClick={() => handleButtonClick(2)}>B</button>
            </form>
        </div>
    );
}