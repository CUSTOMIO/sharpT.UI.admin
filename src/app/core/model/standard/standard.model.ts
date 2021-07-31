export class Standard {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    allowSubjectSelection: boolean;
    updatedAt: string;
    constructor(item: Standard) {
        Object.assign(this, item)
    }
}   