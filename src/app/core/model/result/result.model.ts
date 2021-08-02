export class Result {
    id: number;
    userId: string;
    subjectId: string;
    examinationDetailId: number;
    marksObtained: number;
    outOf: number;
    updatedAt: string;
    examinationName: string;
    
    constructor(item: Result) {
        Object.assign(this, item)
    }
}