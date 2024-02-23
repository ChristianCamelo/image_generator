import React from "react";
import Tag from "./Tag";
import Buscador from "./Buscador";
import axios from "axios";

import { useEffect } from "react";
import { postImagine, getResults, getStatus } from "../dependencies/commands.js"; // Asegúrate de importar las funciones necesarias


export default function Filtros() {

    return (
        <div>
            <form id="prompt-input">
                <h3>Herramientas</h3>
                <p>Descripción</p>
                <textarea id="prompt" type="text" name="prompt" placeholder="Personas teniendo un meeting de ..." />
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
                <textarea id="prompt" type="text" name="prompt" placeholder="Nubes..." />
                <p>Relación de aspecto</p>
                <select>
                    <option>1:1</option>
                    <option>2:3</option>
                    <option>3:2</option>
                    <option>4:7</option>
                    <option>5:4</option>
                    <option>7:4</option>
                    <option>9:16</option>
                    <option>16:9</option>
                </select>
                <button type="submit">Go</button>
            </form>
        </div>
    )
}

