export class ExaminationDetailBySId {
    id: number;
    name: string;

    constructor(item: ExaminationDetailBySId) {
        Object.assign(this, item);
    }
}