import axios from 'axios';
import { useNavigate } from "react-router-dom";

function getNonce() {
	const range = 99999999999999999 - 1 + 1;
	const value = Math.floor(Math.random() * range) + 1;
	return value.toString();
}

function getSession() {
	return (new Date()).getTime()
}

const serverURL = "http://localhost:8080";

const discordAPI = `https://discord.com/api/v10`;
const MidjourneyAppId = `936929561302675456`;
const MidjourneyVersion = `1166847114203123795`;

const discord = `MTEzMDc0MzQ4OTU3MTg2ODc1NA.GqeO59.wJYkjErhNyhtshTGNvf6MR0-uFYy1xAcP4Z02M`;
const server = `1204813483431034911`;
const channel = `1204813526883897386`;
const postpromt = " aqua colors, ash gray, cyan colors, silver colors, metal materials, marketing ad";
const promptparams = "realistic image, by canon 5 R.High resolution. Photorealistic lighting, 8K. Super Resolution, Megapixel, Pro Photo | 8k 35mm, 8k, depth of field --iw 0.5 --v 6.0 --ar 16:9"
let preprompt = [];
let promptsHistory = [];
//console.info({ discord, server, channel, imagine_prompt });

var messageId = ""
var customId = ""

const brandColorsB = " aqua colors, ash gray, cyan colors, silver colors, metal materials, industry work, marketing ad";
const brandColorsC = " aqua colors, ash gray, cyan colors, silver colors, metal materials, industry work, marketing ad";


const DiscordHeaders = (token) => ({
	"Content-Type": "application/json",
	"Accept": 'application/json',
	"Authorization": token
});

function AddPromptTag(tag) {
	console.log(tag)
	const index = preprompt.findIndex(item => item.etiqueta === tag.etiqueta)
	console.log(index)
	if (index === -1) {
		preprompt.push(tag);
	}
	else {
		preprompt.splice(index, 1);
	}
	console.log(preprompt)
}

function readTags() {

	const etiquetas = preprompt.map(item => item.etiqueta);
	const prepromptString = etiquetas.join(", ");
	return prepromptString;
}

async function Login(name, pass, callback) {
    let data = JSON.stringify({
        "name": name,
        "pwd": pass
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: serverURL + '/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        const response = await axios.request(config);
        const status = response.data.status;
		const token = response.data.token;
        callback(status,token); // Llamar al callback con el estado
    } catch (error) {
        console.error(error);
        callback(-1); // Llamar al callback con un código de error
    }
}


async function GetDiscordChannelMessages(token, callback) {
	console.log("enviando token ",token)
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: serverURL + '/messages',
        headers: {
			'Authorization':token,
            'Content-Type': 'application/json'
        },
    };
    try {
        const response = await axios.request(config);
		const messages = response.data;
        callback(messages); // Llamar al callback con el estado
    } catch (error) {
        console.error(error);
        callback(-1); // Llamar al callback con un código de error
    }
}

async function PostDiscordImagine( token, prompt, callback) {
	console.log("enviando pormpt ",token)
	let data = JSON.stringify({
        "prompt": prompt,
    });
	let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: serverURL + '/messages',
        headers: {
			'Authorization': token,
            'Content-Type': 'application/json'
        },
		data: data
    };
    try {
        const response = await axios.request(config);
		const messages = response.data;
        callback(messages); // Llamar al callback con el estado
    } catch (error) {
        console.error(error);
        callback(-1); // Llamar al callback con un código de error
    }

}

async function CheckResults() {
}


async function GetInteraction(option, image) {
}

function splitHash(hashStr) {
	const parts = hashStr.split("::");
	const customId = parts.pop();  // Extrae y remueve el último elemento (UUID)
	const mj = parts.join("::");   // Une los elementos restantes con "::"
	return { custom_id: customId, MJ: mj };
}

export function getPromptHistory() { return promptsHistory };
export function getStatus() { return CheckResults() };
export function getInteraction(option, image) { return GetInteraction(option, image) };

export function getMessages(token, callback) { return GetDiscordChannelMessages(token, callback) };
export function postImagine(token, prompt, callback) { return PostDiscordImagine(token, prompt, callback) };
export function getLogin(name, pwd, callback) { return Login(name, pwd, callback) }

export function addTag(tag) { return AddPromptTag(tag) }
