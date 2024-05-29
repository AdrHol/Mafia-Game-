export class PlayerData{
    private name: string | null;

    constructor(){
        this.name = null;
    }
    getName(): string | null {
        return this.name;
    }
    setName(name: string | null){
        this.name = name;
    }
}