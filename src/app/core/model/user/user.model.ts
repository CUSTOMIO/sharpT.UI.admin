export class UsersDetail {
    firstName: string;
    middleName: object;
    isVerified: boolean;
    standardName: string;
    createdAt: string;
    userId: number;
    email: string;

    constructor(item: UsersDetail) {
        Object.assign(this, item);
    }
}

