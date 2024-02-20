import React, { useEffect } from "react";
import axios from "axios";

import { postImagine, getResults, getStatus } from "../dependencies/commands.js"; // Asegúrate de importar las funciones necesarias

export default function Buscador() {
    useEffect(() => {
        async function handleFormSubmit(e) {
            e.preventDefault();

            let prompt = document.getElementById('prompt').value;
            //let loader = document.getElementById('loader').style.display = "block";
            let progreso = document.getElementById('LoaderFather').style.display = "block";
            document.getElementById('LoaderSon').innerHTML = "10%";
            //var execute = await postImagine(prompt);
            var data = "";
            var messageId = "";
            var customId = "";


            // // Definir una función para obtener resultados y ejecutarla cada 5 segundos
            async function checkResults() {
                return new Promise((resolve, reject) => {
                    const intervalId = setInterval(async () => {
                        const {status,progress,image} = await getStatus();
                        console.log(status +"/ "+progress + "/ " + image)
                        if (status === true) {
                            //  GENERACION TERMINADA , IMAGEN 100%
                            clearInterval(intervalId);
                            let resultado = document.getElementById('resultado').src = image;
                            let progreso = document.getElementById('LoaderFather').style.display = "none";
                            document.getElementById('LoaderSon').innerHTML = "";
                            let lastPrompt = document.getElementById('lastPrompt').innerHTML = prompt;
                            let reset = document.getElementById('prompt').value = "";
                            document.getElementById('btn-download').download = image + ".png";

                            let botones = document.getElementsByClassName('ImagenUI');
                            for (let i = 0; i < botones.length; i++) {
                                botones[i].style.display = "inline-block";
                            }

                            resolve(); // Resolvemos la promesa cuando se obtienen los resultados
                        } else {
                            if(progress === "0"){
                                let progreso = document.getElementById('LoaderSon').style.width = "10%";
                            }else{
                                document.getElementById('LoaderSon').innerHTML = progress + "%";
                                let progreso = document.getElementById('LoaderSon').style.width = progress + "%";
                            }
                            
                        }
                    }, 3000); // Ejecutar cada 3 segundos (3000 milisegundos)
                });
            }

            // Llamar a la función para iniciar la obtención de resultados
            checkResults().then(async () => {
                console.log('Resultados obtenidos. Ejecutando código adicional...');
            });
        }

        document.getElementById('prompt-input').addEventListener('submit', handleFormSubmit);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            document.getElementById('prompt-input').removeEventListener('submit', handleFormSubmit);
        };
    }, []);

    return (
        <div className="Buscador">
            <form id="prompt-input">
                <input id="prompt" type="text" name="prompt" placeholder="Personas teniendo un meeting de ..." />
                <button type="submit">Go</button>
            </form>
        </div>
    );
}
