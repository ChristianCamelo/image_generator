import React from "react";
import { useState } from "react";
import { getLogin } from "../dependencies/commands";
import { useNavigate } from "react-router-dom";

export default function Login_Page() {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();
        
        getLogin(user, pwd, function(data,token){
            console.log(data,token)
            switch(data.status){
				case 200:   document.getElementById("error-login").innerHTML = "";
                            document.cookie = "token="+token;  
                            document.cookie = "user="+user; 
                            if(user==="admin")navigate('/register')                 
                            else navigate('/workspace');
                    break;
				case 201 : document.getElementById("error-login").innerHTML = "El usuario no existe, verifique los datos e intente de nuevo.";
                    break;
				case 202 : document.getElementById("error-login").innerHTML = "Verifique los datos ingresados e intente de nuevo.";
                    break;
			}
        });
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div>
                    <h1>Bienvenido a Brander</h1>
                    <p>Ingresa tus datos de inicio de sesión</p>
                    <p id="error-login"><strong></strong></p>
                    <form onSubmit={handleFormSubmit} id="login-input">
                        <label htmlFor="user">Nombre de Usuario</label>
                        <input id="user" name="user" type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
                        <label htmlFor="pwd">Contraseña</label>
                        <input id="pwd" name="pwd" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
                        <button type="submit">Ingresar</button>
                    </form>
                </div>
                <div>
                    <p>
                        The only problem is that the paragraph comes out as one very long line of text as opposed to several lines in the text editor. 
                        Is there a setting I can change so that it automatically generates my lorem ipsum on multiple lines
                    </p>
                    <p><a href="#">Términos y condiciones del servicio</a></p>
                </div>
            </div>
        </div>
    );
}
