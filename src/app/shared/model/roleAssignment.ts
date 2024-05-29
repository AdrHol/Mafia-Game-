import { AdditionalRole } from "./additionalRole";

export interface RoleAssignment{
    basicRole: string;
    additionalRole: AdditionalRole | undefined;
    // constructor(basicRole: string, additionalRole: AdditionalRole | undefined){
    //     this.basicRole = basicRole;
    //     this.additionalRole = additionalRole;
    // }
}