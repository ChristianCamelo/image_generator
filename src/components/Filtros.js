import React from "react";
import Tag from "./Tag";
import axios from "axios";
import { useEffect } from "react";
import { postImagine, getResults, getStatus } from "../dependencies/commands.js"; // Asegúrate de importar las funciones necesarias


export default function Filtros() {

    return (
        <div>
            <form id="prompt-input">
                <h3>Herramientas</h3>
                <p>Descripción</p>
                <p id="error-prompt">Porfavor ingresa una descripción para la imagen.</p>
                <textarea required id="prompt" type="text" name="prompt" placeholder="Personas teniendo un meeting de ..." />
                <p>Creatividad</p>
                <input type="range" min="0" max="100"></input>
                <p>Calidad</p>
                <input type="range" min="0" max="100"></input>
                <p>Etiquetas</p>
                <div className="TagContainer">
                    <Tag etiqueta="War"></Tag>
                    <Tag etiqueta="WWII"></Tag>
                    <Tag etiqueta="Mecanico"></Tag>
                    <Tag etiqueta="Personas"></Tag>
                    <Tag etiqueta="Calles"></Tag>
                    <Tag etiqueta="Ciudad"></Tag>
                    <Tag etiqueta="Amateur"></Tag>
                    <Tag etiqueta="Cultura"></Tag>
                    <Tag etiqueta="Tecnologia"></Tag>
                    <Tag etiqueta="Animales"></Tag>
                    <Tag etiqueta="Moda"></Tag>
                    <Tag etiqueta="Calles"></Tag>
                    <Tag etiqueta="Ciudad"></Tag>
                    <Tag etiqueta="Amateur"></Tag>
                    <Tag etiqueta="Cultura"></Tag>
                    <Tag etiqueta="Tecnologia"></Tag>
                    <Tag etiqueta="Animales"></Tag>
                    <Tag etiqueta="Moda"></Tag>
                </div>
                <p>Evitar</p>
                <textarea id="negative" type="text" name="prompt" placeholder="Nubes..." />
                <p>Relación de aspecto</p>
                <select required id="aspect">
                    <option value="1:1">1:1</option>
                    <option value="2:3">2:3</option>
                    <option value="3:2">3:2</option>
                    <option value="4:7">4:7</option>
                    <option value="5:4">5:4</option>
                    <option value="7:4">7:4</option>
                    <option value="9:16">9:16</option>
                    <option value="16:9">16:9</option>
                </select>
                <button type="submit">Go</button>
            </form>
        </div>
    )
}

