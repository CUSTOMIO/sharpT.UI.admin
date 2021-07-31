export class ExaminationType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    constructor(item: ExaminationType) {
        Object.assign(this, item);
    }
}