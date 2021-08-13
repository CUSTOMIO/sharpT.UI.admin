export class ReachUs {
    id: number;
    name: string;
    email: string;
    message: string;
    truncatedMsg: string;
    createdAt: string;

    constructor(item: ReachUs) {
        Object.assign(this, item);
    }
}