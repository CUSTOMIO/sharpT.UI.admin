export class User {
    username: string;
    userDoc: object;
    userPersonalDoc: object;
    standardDoc: object;
    constructor(item: User) {
        Object.assign(this, item)
    }
}