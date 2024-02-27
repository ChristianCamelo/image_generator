import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Prompt from '../models/Prompt';
import Imagen from '../components/Imagen';

const serverURL = "http://localhost:8080";

const postpromt = " aqua colors, ash gray, cyan colors, silver colors, metal materials, marketing ad";
const promptparams = "realistic image, by canon 5 R.High resolution. Photorealistic lighting, 8K. Super Resolution, Megapixel, Pro Photo | 8k 35mm, 8k, depth of field --iw 0.5 --v 6.0 --ar 16:9"
let preprompt = [];
let promptsHistory = [];

var messageId = ""
var customId = ""

const brandColorsB = " aqua colors, ash gray, cyan colors, silver colors, metal materials, industry work, marketing ad";
const brandColorsC = " aqua colors, ash gray, cyan colors, silver colors, metal materials, industry work, marketing ad";

function AddPromptTag(tag,tags) {
	console.log(tag)
	const index = tags.findIndex(item => item.etiqueta === tag.etiqueta)
	console.log(index)
	if (index === -1) {
		tags.push(tag);
	}
	else {
		tags.splice(index, 1);
	}
	console.log(tags)
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
		callback(status, token); // Llamar al callback con el estado
	} catch (error) {
		console.error(error);
		callback(-1); // Llamar al callback con un código de error
	}
}

async function BuildImages(data) {
	console.log("BuildImages ", data.message);
	const images = data.message.length >= 5 ? data.message.slice(0, 5) : data.message.slice(0, data.message.length-1);
	const prompts = [];
	for (let i = 0; i < images.length; i++) {
		if (data[i]['attachments'].length!==0) {
			const prompt = new Prompt(i, images[i]);
			prompts.push(prompt);
		}
	}
	console.log(JSON.stringify(prompts));
	return prompts;
}


async function GetDiscordChannelMessages(token, callback) {
	console.log("enviando token ", token)
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: serverURL + '/messages',
		headers: {
			'Authorization': token,
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

async function PostDiscordImagine(token, data, callback) {
	console.log("PostDiscordImagine : datos :", data)
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

async function getStatusPrompt(token) {
	var result = await GetDiscordChannelMessages(token);
	if (result[0]['components'].length !== 0) {
		//  GENERACION TERMINADA , IMAGEN 100%
		messageId = result[0]['id'];
		const image = result[0]['attachments'][0]['url'];
		customId = result[0]['components'][0]['components'][0]['custom_id'].split("::")[-1]; // obtiene el hash de la imagen
		if (customId === "SOLO") customId = result[0]['components'][0]['components'][0]['custom_id'].split("::")[-2]; // obtiene el hash de la imagen
		const data = { status: true, progress: "100", image: image, result: result }
		return (data);
	} else {
		// VERIFICA EL ESTADO DE LA GENERACION
		const regex = /\((\d+)%\)/;
		const match = result[0]['content'].match(regex);
		let valor = "0";
		if (match && match[1]) {
			valor = match[1];
		}
		const data = { status: false, progress: valor, image: "", result: result };
		return (data);
	}
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
export function getInteraction(option, image) { return GetInteraction(option, image) };


export function getStatus(token) { return getStatusPrompt(token) };
export function getMessages(token, callback) { return GetDiscordChannelMessages(token, callback) };
export function postImagine(token, data, callback) { return PostDiscordImagine(token, data, callback) };
export function getLogin(name, pwd, callback) { return Login(name, pwd, callback) }
export function buildImages(data) { return BuildImages(data) }
export function addTag(tag,tags) { return AddPromptTag(tag,tags) }
