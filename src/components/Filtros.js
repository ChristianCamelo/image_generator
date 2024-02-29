import React from "react";
import Tag from "./Tag";
import axios from "axios";
import { useEffect } from "react";
import { postImagine, getResults, getStatus } from "../dependencies/commands.js"; // Asegúrate de importar las funciones necesarias
import Tooltip from "./Tooltip.js";

export default function Filtros({ postPrompt, tags, updateTags }) {

    return (
        <div>
            <form id="prompt-input" onSubmit={postPrompt}>
                <Tooltip text="Valores para generar la imagen">
                    <h3>Herramientas</h3>
                </Tooltip>
                <Tooltip text="Descripción detallada de la escena que se quiera generar">
                    <p>Descripción*</p>
                </Tooltip>
                <p id="error-prompt">Porfavor ingresa una descripción para la imagen.</p>
                <textarea required id="prompt" type="text" name="prompt" placeholder="Personas teniendo un meeting de ..." />
                <Tooltip text="Cuanto se va a regir la generación de la imagen a los filtros, una cantidad baja representa una imagen menos sujeta a las configuracioens">
                    <p>Creatividad</p>
                </Tooltip>
                <input type="range" defaultValue="0" id="creative" min="0" max="1" step="0.1" ></input>
                <span id="creative-range">
                    <p>0</p>
                    <p>100</p>
                </span>
                <Tooltip text="Calidad de la imagen, por defecto es Alta, una imagen más baja puede tardar menos en generarse">
                    <p>Calidad</p>
                </Tooltip>
                <select required id="quality">
                    <option value="1">Alta</option>
                    <option value="0.5">Media</option>
                    <option value="0.25">Baja</option>
                </select>
                <Tooltip text="Estilo de la imagen">
                    <p>Estilo</p>
                </Tooltip>
                <select required id="style">
                    <option value="1">Fotográfico</option>
                    <option value="3">Animado</option>
                    <option value="2">Vectorial</option>
                </select>
                <Tooltip text="Conceptos clave sobre el contexto de la imagen">
                    <p>Etiquetas</p>
                </Tooltip>
                <div className="TagContainer">
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Fantastico"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Futurista"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Antiguo"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Fabrica"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Vintage"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Fiesta"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Animado"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Aniversario"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Empresa"></Tag>
                    <Tag tags={tags} updateTags={updateTags} etiqueta="Monocromatico"></Tag>
                </div>
                <Tooltip text="Conceptos clave que se quieran evitar">
                    <p>Evitar</p>
                </Tooltip>
                <textarea id="negative" type="text" name="prompt" placeholder="Nubes..." />
                <Tooltip text="Relación entre el alto y el ancho, por defecto es 1:1">
                    <p>Relación de aspecto</p>
                </Tooltip>
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
                <p>Todos los campos con (*) son obligatorios. </p>
            </form>
        </div>
    )
}

