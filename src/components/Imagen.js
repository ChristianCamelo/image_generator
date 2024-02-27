import ImagenUI from "./ImagenUI";

export default function Imagen({ prompt }) {
    let botones;

        const handleExpand = (e) => {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = prompt.image;
            link.target = "_blank"; // Abrir en una nueva pestaña para descargar
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

    botones = (
                    <ImagenUI prompt={prompt} imagen="1"></ImagenUI>
    );
    // }

    return (
        <div className="Imagen">
            <a onClick={handleExpand}><img id="resultado" src={prompt.image} alt="placeholder" /></a>
            <p>{prompt.prompt}</p>
            {botones}
        </div>
    );
}
