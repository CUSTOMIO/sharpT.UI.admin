export class AcademicYear {
    id: number;
    startYear: string;
    endYear: string;
    constructor(item: AcademicYear) {
        Object.assign(this, item);
    }
}