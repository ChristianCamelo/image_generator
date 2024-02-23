import placeholder from "../images/placeholder.webp";
import Prompt from "../models/Prompt";

export default function History({prompt}) {

    //console.log("History: Index:", prompt.index, " Prompt:", prompt);

    return (
        <div className="History">
            <img alt="resultado de prompt anterior" src={prompt.image} />
            <p><i>{prompt.prompt}</i></p>
        </div>
    );
}