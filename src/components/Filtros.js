import React from "react";
import Tag from "./Tag";
import axios from "axios";
import { useEffect } from "react";
import { postImagine, getResults, getStatus } from "../dependencies/commands.js"; // Asegúrate de importar las funciones necesarias


export default function Filtros({postPrompt,tags ,updateTags}) {

    return (
        <div>
            <form id="prompt-input" onSubmit={postPrompt}>
                <h3>Herramientas</h3>
                <p>Descripción</p>
                <p id="error-prompt">Porfavor ingresa una descripción para la imagen.</p>
                <textarea required id="prompt" type="text" name="prompt" placeholder="Personas teniendo un meeting de ..." />
                <p>Creatividad</p>
                <input type="range" id="creative" min="0" max="1" step="0.1" ></input>
                <p>Calidad</p>
                <select required id="quality">
                    <option value="0.25">Baja</option>
                    <option value="0.5">Media</option>
                    <option value="1">Alta</option>
                </select>
                <p>Estilo</p>
                <select required id="style">
                    <option value="1">Fotográfico</option>
                    <option value="3">Animado</option>
                    <option value="2">Vectorial</option>
                </select>
                <p>Etiquetas</p>
                <div className="TagContainer">
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Gato"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Perro"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Mascota"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Rinoceronte"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Pez"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Ardilla"></Tag>
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

