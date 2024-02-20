import React, { useState } from "react";
import { addTag } from "../dependencies/commands";

export default function Tag({ etiqueta }) {

    const [isActive, setIsActive] = useState(false);

    async function changeStatus(e) {
        e.preventDefault();
        addTag({ etiqueta });
        setIsActive(!isActive)
    }

    const buttonClass = isActive ? "activeTag" : "";

    return (
        <div className="Tag">
            <button onClick={changeStatus} className={buttonClass}>{etiqueta}</button>
        </div>
    )
}
