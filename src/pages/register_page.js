import { useState, useEffect } from "react";
import logo from '../images/logo.png'
import { registerUser } from "../dependencies/commands";

export default function Register_Page() {


    const [selectedColors, setSelectedColors] = useState([]);
    const asciiRegex = /^[\x00-\x7F]*$/;
    const colorsList = [
        { name: "black", hex: "#000000" },
        { name: "dim gray", hex: "#696969" },
        { name: "gray", hex: "#808080" },
        { name: "dark gray", hex: "#A9A9A9" },
        { name: "light gray", hex: "#D3D3D3" },
        { name: "gainsboro", hex: "#DCDCDC" },
        { name: "white smoke", hex: "#F5F5F5" },
        { name: "ash gray", hex: "#B2BEB5" },
        { name: "auburn color", hex: "#A52A2A" },
        { name: "baby blue", hex: "#89CFF0" },
        { name: "baby pink", hex: "#F4C2C2" },
        { name: "beige colors", hex: "#F5F5DC" },
        { name: "black and white", hex: "#000000" },
        { name: "black bean color", hex: "#3D0C02" },
        { name: "black olive", hex: "#3B3C36" },
        { name: "blood red", hex: "#660000" },
        { name: "blue violet", hex: "#8A2BE2" },
        { name: "bordo color", hex: "#800000" },
        { name: "bronze colors", hex: "#CD7F32" },
        { name: "buff color", hex: "#F0DC82" },
        { name: "burgundy colors", hex: "#800020" },
        { name: "burnt amber", hex: "#CC5500" },
        { name: "burnt sienna", hex: "#E97451" },
        { name: "canary yellow", hex: "#FFEF00" },
        { name: "candy colors", hex: "#FBEC5D" },
        { name: "cerulean blue color", hex: "#007BA7" },
        { name: "chartreuse color", hex: "#7FFF00" },
        { name: "chestnut color", hex: "#954535" },
        { name: "chinese violet", hex: "#856088" },
        { name: "cinnamon colors", hex: "#D2691E" },
        { name: "cobalt blue color", hex: "#0047AB" },
        { name: "cool colors", hex: "#6495ED" },
        { name: "cooper color", hex: "#B87333" },
        { name: "coral color", hex: "#FF7F50" },
        { name: "cornflower blue", hex: "#6495ED" },
        { name: "cotton candy colors", hex: "#FFBCD9" },
        { name: "crimson colors", hex: "#DC143C" },
        { name: "cyan colors", hex: "#00FFFF" },
        { name: "dark green", hex: "#013220" },
        { name: "dark orange", hex: "#FF8C00" },
        { name: "dark pink", hex: "#E75480" },
        { name: "dark pink colors", hex: "#FF1493" },
        { name: "dark purple", hex: "#301934" },
        { name: "dark red", hex: "#8B0000" },
        { name: "dark violet", hex: "#9400D3" },
        { name: "desaturated", hex: "#A4A4A4" },
        { name: "ecru color", hex: "#C2B280" },
        { name: "electric blue", hex: "#7DF9FF" },
        { name: "electric indigo", hex: "#6F00FF" },
        { name: "electric purple", hex: "#BF00FF" },
        { name: "electric colors", hex: "#7DF9FF" },
        { name: "fflax color", hex: "#FFF5EE" },
        { name: "forest green", hex: "#228B22" },
        { name: "fuchsia colors", hex: "#FF00FF" },
        { name: "golden yellow", hex: "#FFD700" },
        { name: "green yellow", hex: "#ADFF2F" },
        { name: "hot pink", hex: "#FF69B4" },
        { name: "hunter green", hex: "#355E3B" },
        { name: "indigo", hex: "#4B0082" },
        { name: "ivory", hex: "#FFFFF0" },
        { name: "khaki colors", hex: "#C3B091" },
        { name: "lavender blush", hex: "#FFF0F5" },
        { name: "lemon yellow", hex: "#FFF44F" },
        { name: "light green", hex: "#90EE90" },
        { name: "light pink colors", hex: "#FFB6C1" },
        { name: "lime colors", hex: "#BFFF00" },
        { name: "magenta color", hex: "#FF00FF" },
        { name: "marigold color", hex: "#EAA221" },
        { name: "millenial pink", hex: "#FFD1DC" },
        { name: "mint color", hex: "#3EB489" },
        { name: "mocha", hex: "#8B7355" },
        { name: "navajo white", hex: "#FFDEAD" },
        { name: "neon green", hex: "#39FF14" },
        { name: "neon orange", hex: "#FFA343" },
        { name: "neon pink", hex: "#FE4164" },
        { name: "olive color", hex: "#808000" },
        { name: "orange", hex: "#FFA500" },
        { name: "orange red", hex: "#FF4500" },
        { name: "pastel green", hex: "#77DD77" },
        { name: "pastel orange", hex: "#FFB347" },
        { name: "pastel pink", hex: "#FFD1DC" },
        { name: "peach color", hex: "#FFE5B4" },
        { name: "persimmon color", hex: "#FF6347" },
        { name: "pink color", hex: "#FFC0CB" },
        { name: "platinum color", hex: "#E5E4E2" },
        { name: "red", hex: "#FF0000" },
        { name: "red copper", hex: "#CB6D51" },
        { name: "salmon color", hex: "#FA8072" },
        { name: "scarlet color", hex: "#FF2400" },
        { name: "sepia colors", hex: "#704214" },
        { name: "sienna color", hex: "#A0522D" },
        { name: "silver colors", hex: "#C0C0C0" },
        { name: "sky blue color", hex: "#87CEEB" },
        { name: "slate gray", hex: "#708090" },
        { name: "smoky black", hex: "#100C08" },
        { name: "snow white", hex: "#FFFAFA" },
        { name: "spring green", hex: "#00FF7F" },
        { name: "tangerine color", hex: "#F28500" },
        { name: "tan color", hex: "#D2B48C" },
        { name: "tea color", hex: "#D0F0C0" },
        { name: "teal", hex: "#008080" },
        { name: "tropical colors", hex: "#00755E" },
        { name: "true blue", hex: "#0073CF" },
        { name: "turquoise color", hex: "#40E0D0" },
        { name: "vantablack", hex: "#1A1A1A" },
        { name: "vibrant colors", hex: "#FF00FF" },
        { name: "vintage colors", hex: "#825E4C" },
        { name: "warm colors", hex: "#FFA54F" },
        { name: "watermelon color", hex: "#FF5566" },
        { name: "yellow green", hex: "#9ACD32" }
    ];

    function calcularTono(color) {
        const r = parseInt(color.hex.substr(1, 2), 16) / 255;
        const g = parseInt(color.hex.substr(3, 2), 16) / 255;
        const b = parseInt(color.hex.substr(5, 2), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let hue = 0;

        if (max === min) {
            hue = 0;
        } else {
            const d = max - min;
            switch (max) {
                case r:
                    hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    hue = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    hue = ((r - g) / d + 4) / 6;
                    break;
            }
        }
        return hue * 360;
    }
    const colorsOrdenados = colorsList.sort((a, b) => calcularTono(a) - calcularTono(b));

    useEffect(() => {
        if (!document.cookie.split(';').length === 2) {
            window.location.href = '/home';
        } else {
            const tokenValue = getCookie("token");
            const userValue = getCookie("user");
            if (userValue !== "admin") {
                window.location.href = '/home';
            }
        }
    }, []);

    const handleCheckboxClick = (newColor) => {
        if (newColor) {
            const tmpColors = [...selectedColors];
            const index = tmpColors.findIndex(colorName => colorName === newColor);
            console.log(index);
            if (index === -1) {
                tmpColors.push(newColor);
            } else {
                tmpColors.splice(index, 1);
            }
            setSelectedColors(tmpColors);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const channel = event.target['reg-channel'].value;
        const materials = event.target['reg-mats'].value;
        const username = event.target['reg-user'].value;
        const password = event.target['reg-pwd'].value;
        const confirmPassword = event.target['reg-pwd2'].value;
        const colors = selectedColors.join(", ")

        // Verificar que el nombre de usuario y la contraseña contengan solo símbolos ASCII
        if (!asciiRegex.test(username) && !asciiRegex.test(password)) {
            console.log("El nombre de usuario debe contener solo símbolos ASCII.");
            return;
        }
        if (!asciiRegex.test(password) || !asciiRegex.test(confirmPassword)) {
            console.log("La contraseña debe contener solo símbolos ASCII.");
            return;
        }
        const tokenValue = getCookie("token");
        const newUser = { username, password, materials, colors, channel };
        // Aquí puedes usar los valores seleccionados para realizar l
        console.log("Creando nuevo usuario: ", newUser)

        registerUser(tokenValue, newUser, (message) => {
            console.log(message);
        })
    };

    function getCookie(name) {
        const cookieValue = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith(name + '='))
            ?.split('=')[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }


    return (
        <div className="login-container">
            <div className="login-box">
                <form id="Register-form" onSubmit={handleSubmit}>
                    <h1>Registro de nuevo usuario</h1>
                    <label htmlFor="reg-user">Nombre del usuario</label>
                    <input type="text" id="reg-user" name="reg-user"></input>

                    <label htmlFor="reg-pwd2">Contraseña</label>
                    <input type="password" id="reg-pwd" name="reg-pwd2"></input>

                    <label htmlFor="reg-pwd2">Repetir contraseña</label>
                    <input type="password" id="reg-pwd2" name="reg-pwd2"></input>

                    <label htmlFor="reg-colors">Colores</label>
                    <div className="Colors">
                        {colorsOrdenados.map((color, index) => (
                            <div className={(selectedColors.includes(color.name) ? "Checkbox picked" : "Checkbox")} onClick={() => handleCheckboxClick(color.name)} key={index} style={{ backgroundColor: color.hex }} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>
                        ))}
                    </div>

                    <label htmlFor="mats">Materiales</label>
                    <input type="text" id="reg-mats" name="mats"></input>

                    <label htmlFor="channel">Canal</label>
                    <input type="text" id="reg-channel" name="channel"></input>

                    <button type="submit">Guardar</button>
                </form>
            </div>
            <p>Almacena muy bien es</p>

        </div>
    )
}