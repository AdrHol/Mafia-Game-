import { RoleAssignment } from "./roleAssignment";

export interface GameStateObject {
    playerId: string;
    gameStared: boolean,
    isPlayerAlive: boolean,
    playerRole: RoleAssignment | undefined,
}