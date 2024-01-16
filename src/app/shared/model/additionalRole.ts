export class AdditionalRole {
    
    id: number;
    displayValue: string | undefined;
    isVillain: boolean;
    private wakesAtNight: boolean;
    
    constructor(id: number, display: string | undefined, isVillain: boolean, wakesAtNight: boolean){
        this.displayValue = display;
        this.isVillain = isVillain;
        this.id = id;
        this.wakesAtNight = wakesAtNight;
    }

    isWakingAtNight(){
        return this.wakesAtNight;
    }

}