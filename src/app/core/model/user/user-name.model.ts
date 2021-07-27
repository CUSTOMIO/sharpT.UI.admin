export class UserName {
    firstName: string;
    middleName: string;
    lastName: string;

    constructor(item: UserName) {
        Object.assign(this, item);
    }
}

