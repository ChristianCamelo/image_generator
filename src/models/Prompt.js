class Prompt{
    
    constructor(index, data){
        this.rawPrompt = data['content'];
        this.prompt = this.rawPrompt.split(" ")[0].split("**")[1];
        this.image = data['attachments'][0]['url'];
        this.messageId = data['id'];
        this.hashedId = data['components'][0]['components'][0]['custom_id'].split("::").pop();
        this.tags = []
        if(this.hashedId==="SOLO"){
            this.tmpdata = data['components'][0]['components'][0]['custom_id'].split("::");
            this.hashedId = this.tmpdata[this.tmpdata.length - 2];
        }
        
        this.index = index;
    }
}

export default Prompt;