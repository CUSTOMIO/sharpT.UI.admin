export class Subject {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    standardId: number;
    standardName: string;
    constructor(item: Subject) {
        Object.assign(this, item);
    }
}
