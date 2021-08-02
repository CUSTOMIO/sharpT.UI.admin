export class UserByStandardId {
    id: number;
    firstName: string;
    middleName: string;
    email: string;

    constructor(item: UserByStandardId) {
        Object.assign(this, item);
    }
}

