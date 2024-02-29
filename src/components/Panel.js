import React from "react";
import Imagen from "./Imagen";

export default function Panel({ prompts }) {

    return (
        <div className="Panel">
            <h3>Resultados</h3>
                {/* Renderiza los componentes Imagen aquí si prompts es un array */}
                {Array.isArray(prompts) && prompts.map((prompt, index) => (
                    <Imagen key={index} prompt={prompt} />
                ))}
        </div>
    );
}


