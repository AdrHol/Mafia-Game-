export class AdditionalRole {
    
    id: number;
    displayValue: string;
    isVillain: boolean;
    
    constructor(id: number, display: string, isVillain: boolean){
        this.displayValue = display;
        this.isVillain = isVillain;
        this.id = id;
    }

}