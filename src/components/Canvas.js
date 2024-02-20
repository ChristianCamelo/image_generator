import React, { useState, useEffect } from "react";
import Filtros from "./Filtros";
import placeholder from "../images/placeholder.webp"
import ImagenUI from "./ImagenUI";
import Panel from "./Panel";
import Prompt from "../models/Prompt";
import Loader from "./Loader";
import { getStatus } from "../dependencies/commands"

export default function Canvas() {

    const [historial, setHistorial] = useState([]);

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
                        const { status, progress, image, result } = await getStatus();
                        //console.log("Canvas: resultado obetnido: "+result);
                        console.log("Canvas: Ultima imagen: "+status + "/ " + progress + "/ " + image)
                        if (status === true) {
                            //  GENERACION TERMINADA , IMAGEN 100%
                            clearInterval(intervalId);
                            let resultado = document.getElementById('resultado').src = image;
                            let progreso = document.getElementById('LoaderFather').style.display = "none";
                            document.getElementById('LoaderSon').innerHTML = "";
                            let reset = document.getElementById('prompt').value = "";

                            let botones = document.getElementsByClassName('ImagenUI');
                            for (let i = 0; i < botones.length; i++) {
                                botones[i].style.display = "inline-block";
                            }

                            //ACTUALIZAR LOS PROMPTS HISTORY
                            let historialTmp = []
                            for (let i = 1; i < 5; i++) {
                                console.log("Canvas : CheckResults: Leido el prompt " + i + " id: " + result[i]['id'])
                                if (result[i] !== "" && i < 5) {
                                    historialTmp.push(new Prompt(i, result[i]));
                                }
                            }
                            setHistorial(historialTmp);
                            resolve(); // Resolvemos la promesa cuando se obtienen los resultados
                        } else {
                            if (progress === "0") {
                                let progreso = document.getElementById('LoaderSon').style.width = "10%";
                            } else {
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
        <div className="Canvas">
            <div className="Interactions">
                <Filtros></Filtros>
            </div>
            <div className="Workspace">
                <Loader></Loader>
                <div className="Resultado">
                    <img id="resultado" src={placeholder} alt="placeholder" />
                    <table>
                        <tbody>
                            <tr>
                                <td><ImagenUI imagen="1"></ImagenUI></td>
                                <td><ImagenUI imagen="2"></ImagenUI></td>
                            </tr>
                            <tr>
                                <td><ImagenUI imagen="3"></ImagenUI></td>
                                <td><ImagenUI imagen="4"></ImagenUI></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Panel historial={historial}></Panel>
        </div>
    )
}