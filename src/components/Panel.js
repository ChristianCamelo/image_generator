import React from "react"
import { getPromptHistory } from "../dependencies/commands"
import History from "./History";

export default function Panel(){
    const historial=[]
    console.log("Panel: Desde panel se leyeron: " + JSON.stringify(historial))


    return(
        <div className="Panel">
            <h3>Última generación</h3>
            {
                historial.map((prompt, index)=>(
                  <History key={index} Prompt={prompt}></History>  
                ))
            }
            <History></History>
            <a href="#"><p>Terminos y condiciones del servicio.</p></a>
        </div>
        
    )
}