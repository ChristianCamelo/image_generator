import { postImagine, getResults } from './commands.js';

document.getElementById('prompt-input').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    let prompt = document.getElementById('prompt').value;
    var execute = await postImagine(prompt);
    var data = ""
    // Definir una función para obtener resultados y ejecutarla cada 5 segundos
    async function checkResults() {
        return new Promise((resolve, reject) => {
            const intervalId = setInterval(async () => {
                var result = await getResults();
                if (result[0]['components'].length !== 0) {
                    console.log("terminado")
                    console.log(result)
                    data = result
                    clearInterval(intervalId);
                    resolve(); // Resolvemos la promesa cuando se obtienen los resultados
                } else {
                    console.log("en progreso");
                }
            }, 3000); // Ejecutar cada 5 segundos (5000 milisegundos)
        });
    }

    // Llamar a la función para iniciar la obtención de resultados
    checkResults().then(async () => {
        document.getElementById('imagen1').src = data[0]['attachments'][0]['url'];
    });
});
