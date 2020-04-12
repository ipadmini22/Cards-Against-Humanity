import { CheckIn } from './checkin';

export class Game {
    id: string;
    creationdate: firebase.firestore.Timestamp;
    creatorId: string;
    creatorName: string;
    currrounds: number;
    finished: boolean;
    maxrounds: number;
    name: string;
    provisioned: boolean;
    scoreboard: any;
    playerIds: string[];
    currPlayer: number;
}
