import { Message } from "./Message";

export class MessagesContainer {
    private messages: Map<String, Message>;
    private MAFIACODE: string = 'MAFIA';
    private EVERYONECODE: string = 'ALL';

    constructor(){
        this.messages = new Map();
    }

    addMessage(code: string, message: Message, ){
        this.messages.set(code, message);

    }
}