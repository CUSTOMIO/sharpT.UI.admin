export class Course {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    allowSubjectSelection : boolean;
    createdAt: Date;
    updatedAt: Date;
    courseId: number;
    standardCourseId: object;
    constructor(item: Course) {
        Object.assign(this, item)
    }
}