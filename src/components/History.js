import placeholder from "../images/placeholder.webp";
import Prompt from "../models/Prompt";

export default function History({ Prompt }) {

    const element = Prompt
    console.log("History: leido el prompt: "+element)

    return (
        <div className="History">
            <img alt="resultado de prompt anterior" src={placeholder} />
            <p><i>Lorem ipsum in dolorem</i></p>

            {/* Corrección: Envuelve el bucle forEach en llaves adicionales */}
            { /*Prompt.tags.map((element, index) => (
                <p key={index}>{element}</p>
            )) */ }
        </div>
    );
}