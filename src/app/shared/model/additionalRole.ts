export class AdditionalRole {
    
    id: number;
    displayValue: string | undefined;
    isVillain: boolean;
    
    constructor(id: number, display: string | undefined, isVillain: boolean){
        this.displayValue = display;
        this.isVillain = isVillain;
        this.id = id;
    }

}