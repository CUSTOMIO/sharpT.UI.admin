export class ExaminationDetail {
    endOn: string;
    endYear: string;
    examinationName: string;
    id: number;
    standardName: string;
    startOn: string;
    startYear: string;
    totalMarks: number;
    updatedAt: string;

    constructor(item: ExaminationDetail) {
        Object.assign(this, item);
    }
}