export class Subject {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    standardId: number;
    constructor(item: Subject) {
        Object.assign(this, item)
    }
}