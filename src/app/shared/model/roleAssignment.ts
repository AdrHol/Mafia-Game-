export class RoleAssignment{
    basicRole: string;
    additionalRole: string | undefined;
    constructor(basicRole: string, additionalRole: string | undefined){
        this.basicRole = basicRole;
        this.additionalRole = additionalRole;
    }
}