import React, { useState, useEffect } from "react";
import Filtros from "./Filtros";
import Loader from "./Loader";
import Imagen from "./Imagen";
import Panel from "./Panel";

export default function Canvas({ prompts }) {
    const [result, setResult] = useState([]);

    // Verificar si hay prompts y establecer el primer prompt como resultado
    useEffect(() => {
        if (prompts.length > 0) {
            setResult(<Imagen className="Result-full" prompt={prompts[0]} />);
        } else {
            setResult(<div className="Result-empty" />);
        }
    }, [prompts]);

    return (
        <div className="Canvas">
            <div className="Interactions">
                <Filtros />
            </div>
            <div className="Workspace">
                <Loader />
                <div className="Resultado">{result}</div>
            </div>
            <Panel prompts={prompts} />
        </div>
    );
}
