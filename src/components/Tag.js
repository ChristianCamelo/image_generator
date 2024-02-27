import React, { useState } from "react";
import { addTag } from "../dependencies/commands";

export default function Tag({  tags ,updateTags ,etiqueta }) {

    const [isActive, setIsActive] = useState(false);

    async function changeStatus(e) {
        e.preventDefault();
        const newTags = [...tags];
        const index = newTags.findIndex(item => item === etiqueta)
        console.log(index)
        if (index === -1) {
            newTags.push(etiqueta);
        }
        else {
            newTags.splice(index, 1);
        }
        updateTags(newTags);
        console.log(newTags);
        setIsActive(!isActive)
    }

    const buttonClass = isActive ? "activeTag" : "";

    return (
        <div className="Tag">
            <button onClick={changeStatus} className={buttonClass}>{etiqueta}</button>
        </div>
    )
}
