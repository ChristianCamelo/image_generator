class Prompt {

    constructor(index, data) {
        this.unique = false;
        this.rawPrompt = data['content'];
        this.prompt = this.rawPrompt.split(" ")[0].split("**")[1];
        this.image = data['attachments'][0]['url'];
        this.messageId = data['id'];
        this.hashedId = data['components'][0]['components'][0]['custom_id'].split("::").pop();
        this.tags = []
        this.index = index;
        // VERIFICA QUE SEA UNA IMAGEN MULTIPLE CUANDO COMPONENTS ES 1033

        if (this.hashedId === "SOLO") {
            this.tmpdata = data['components'][0]['components'][0]['custom_id'].split("::");
            this.hashedId = this.tmpdata[this.tmpdata.length - 2];
            this.unique = true;
        }

        //console.log("History: cargada imagen id:", this.id, " imagen: ", this.image, " unica: ", this.unique)
    }
}

export default Prompt;