export class Batch {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(item: Batch) {
        Object.assign(this, item)
    }
}   