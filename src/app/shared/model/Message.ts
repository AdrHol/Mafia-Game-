export class Message {
    private roleName: string; 
    private standardWakeText = 'Budzi się ';
    private standardSleepText = ' śpi';

    constructor(roleName: string){
        this.roleName = roleName;
    }

    getDisplayedWakeMessage(){
        return this.standardWakeText + this.roleName;
    }
    
    getDisplayedSleepMessage(){
        return this.roleName + this.standardSleepText;
    }


}