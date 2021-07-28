export class UserSubject {
    subjectId: number;
    name: string;

    constructor(item: UserSubject) {
        Object.assign(this, item);
    }
}

