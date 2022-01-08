export class ReachUs {
    id: number;
    Name: string;
    Email: string;
    message: string;
    Message: string;
    createdAt: string;

    constructor(item: ReachUs) {
        Object.assign(this, item);
    }
}
