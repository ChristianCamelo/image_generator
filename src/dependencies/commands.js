import axios from 'axios';
import { Tolgee, DevTools, TolgeeProvider, FormatSimple } from "@tolgee/react";
import Prompt from '../models/Prompt';

function getNonce() {
	const range = 99999999999999999 - 1 + 1;
	const value = Math.floor(Math.random() * range) + 1;
	return value.toString();
}

function getSession() {
	return (new Date()).getTime()
}


const discordAPI = `https://discord.com/api/v10`;
const MidjourneyAppId = `936929561302675456`;
const MidjourneyVersion = `1166847114203123795`;

const toggleAPI = 'https://app.tolgee.io';
const toggleToken = 'tgpak_gu2dinc7oa4wcodvnbswcz3km5vhi2digz2ggzdsgbtg233mn4';

const discord = `MTEzMDc0MzQ4OTU3MTg2ODc1NA.GqeO59.wJYkjErhNyhtshTGNvf6MR0-uFYy1xAcP4Z02M`;
const server = `1204813483431034911`;
const channel = `1204813526883897386`;
const postpromt = " aqua colors, ash gray, cyan colors, silver colors, metal materials, marketing ad";
const promptparams = "realistic image, by canon 5 R.High resolution. Photorealistic lighting, 8K. Super Resolution, Megapixel, Pro Photo | 8k 35mm, 8k, depth of field --iw 0.5 --v 6.0 --ar 16:9"
let preprompt = [];
let promptsHistory = [];
//console.info({ discord, server, channel, imagine_prompt });

const styles = ["realistic", " ", " "]

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

async function GetDiscordChannelMessages() {
	try {
		const response = await axios.get(
			`${discordAPI}/channels/${channel}/messages`,
			{ headers: DiscordHeaders(discord) }
		);
		//console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('GetDiscordChannelMessages: Error al obtener mensajes del canal:', error);
		throw error;
	}
}

async function PostDiscordImagine(prompt) {
	try {
		const nonce = await getNonce();
		const session_id = await getSession();
		const fullprompt = prompt.concat(" ", readTags(), postpromt, promptparams);

		const response = await axios.post(
			`${discordAPI}/interactions`,
			{
				"type": 2,
				"application_id": MidjourneyAppId,
				"guild_id": server,
				"channel_id": channel,
				"session_id": session_id,
				"data": {
					"version": MidjourneyVersion,
					"id": "938956540159881230",
					"name": "imagine",
					"type": 1,
					"options": [
						{
							"type": 3,
							"name": "prompt",
							"value": fullprompt
						}
					],
					"application_command": {
						"id": "938956540159881230",
						"type": 1,
						"application_id": "936929561302675456",
						"version": MidjourneyVersion,
						"name": "imagine"
					},
					"attachments": []
				},
				"nonce": nonce,
				"analytics_location": "slash_ui"
			},
			{ headers: DiscordHeaders(discord) }
		);

		if (response.status === 204) {
			console.log('PostDiscordImagine: La solicitud fue exitosa pero no hay contenido.');
			return;
		} else if (!response.ok) {
			throw new Error('PostDiscordImagine: PostDiscordImagineLa solicitud no fue exitosa: ' + response.statusText);
		}
		return response;
	} catch (error) {
		console.error('PostDiscordImagine: Error en la solicitud de Discord:', error);
		throw error;
	}
}

async function CheckResults() {
	var result = await GetDiscordChannelMessages();
	if (result[0]['components'].length !== 0) {
		//  GENERACION TERMINADA , IMAGEN 100%
		// ALMACENA LOS VALORES DE LA IMAGEN PARA OBTENER IMAGEN Y VARIACION
		messageId = result[0]['id']; // obtiene el id del mensaje
		const image = result[0]['attachments'][0]['url'];
		customId = result[0]['components'][0]['components'][0]['custom_id'].split("::").pop(); // obtiene el hash de la imagen
		
		//ACTUALIZAR LOS PROMPTS HISTORY
		for(let i=1;i<4;i++){
			console.log("CheckResults: Leido el prompt "+i+" contenido: "+result[i]['id'])
			if(result[i]!==""){
				promptsHistory.push(new Prompt(i,result[i]));
			}
		}
		//console.log("Check Results: Prompt History " + JSON.stringify(promptsHistory));

		const data = { status: true, progress: "100", image: image }
		return (data);
	} else {
		// VERIFICA EL ESTADO DE LA GENERACION
		const regex = /\((\d+)%\)/;
		const match = result[0]['content'].match(regex);
		let valor = "0";
		if (match && match[1]) {
			valor = match[1];
		}
		const data = { status: false, progress: valor, image: "" }
		//console.log(data)
		return (data);
	}
}



async function CheckResultsImage(message) {
	var result = await GetDiscordChannelMessages();
	if (result[0]['components'].length !== 0) {
		//  GENERACION TERMINADA , IMAGEN 100%
		// ALMACENA LOS VALORES DE LA IMAGEN PARA OBTENER IMAGEN Y VARIACION
		messageId = result[0]['id']; // obtiene el id del mensaje
		const image = result[0]['attachments'][0]['url'];
		customId = result[0]['components'][0]['components'][0]['custom_id'].split("::").pop(); // obtiene el hash de la imagen
		//console.log(messageId + "//" + customId);
		const data = { status: true, progress: "100", image: image }
		//console.log(data)
		return (data);
	} else {
		// VERIFICA EL ESTADO DE LA GENERACION
		const regex = /\((\d+)%\)/;
		const match = result[0]['content'].match(regex);
		let valor = "0";
		if (match && match[1]) {
			valor = match[1];
		}
		const data = { status: false, progress: valor, image: "" }
		//console.log(data)
		return (data);
	}
}

async function GetInteraction(option, image) {
	try {
		const nonce = await getNonce();
		const session_id = await getSession();

		// OPCION 1 VARIAR, OPCION 2 ESCALAR
		const variationSetup = "MJ::JOB::variation::";
		const upsampleSetup = "MJ::JOB::upsample::";
		var picked = "";

		if (option === 1) {
			picked = variationSetup;
		}
		if (option === 2) {
			picked = upsampleSetup;
		}

		const response = await axios.post(
			`${discordAPI}/interactions`,
			{
				"type": 3,
				"nonce": nonce,
				"guild_id": server,
				"channel_id": channel,
				"message_flags": 0,
				"message_id": messageId,
				"application_id": MidjourneyAppId,
				"session_id": session_id,
				"data": {
					"component_type": 2,
					"custom_id": picked + image + "::" + customId
				}
			},
			{ headers: DiscordHeaders(discord) }
		);
		if (response.status === 204) {
			console.log('GetInteraction: La solicitud fue exitosa pero no hay contenido.');
			return;
		} else if (!response.ok) {
			throw new Error('GetInteraction: La solicitud no fue exitosa: ' + response.statusText);
		}
		return response;
	} catch (error) {
		console.error('GetInteraction: Error en la solicitud de Discord:', error);
		throw error;
	}
}

function splitHash(hashStr) {
	const parts = hashStr.split("::");
	const customId = parts.pop();  // Extrae y remueve el último elemento (UUID)
	const mj = parts.join("::");   // Une los elementos restantes con "::"
	return { custom_id: customId, MJ: mj };
}

export function getPromptHistory(){ return promptsHistory };
export function getStatus() { return CheckResults() };
export function getInteraction(option, image) { return GetInteraction(option, image) };
export function getResults() { return GetDiscordChannelMessages() };
export function postImagine(prompt) { return PostDiscordImagine(prompt) };
export function addTag(tag) { return AddPromptTag(tag) }