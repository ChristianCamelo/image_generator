import React from "react";
import Filtros from "./Filtros";
import placeholder from "../images/placeholder.webp"
import loader from "../images/load.png"
import ImagenUI from "./ImagenUI";
import Panel from "./Panel";
import Buscador from "./Buscador";
import Loader from "./Loader";

export default function Canvas() {
    return (
        <div className="Canvas">
            <div className="Interactions">
                <Filtros></Filtros>
            </div>
            <div className="Workspace">
                <Loader></Loader>
                <div className="Resultado">
                    <img id="resultado" src={placeholder} alt="placeholder" />
                    <table>
                        <tbody>
                            <tr>
                                <td><ImagenUI imagen="1"></ImagenUI></td>
                                <td><ImagenUI imagen="2"></ImagenUI></td>
                            </tr>
                            <tr>
                                <td><ImagenUI imagen="3"></ImagenUI></td>
                                <td><ImagenUI imagen="4"></ImagenUI></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Panel></Panel>
        </div>

    )
}