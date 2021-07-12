export class User {
    username: string;
    email: string
    constructor(item: User) {
        Object.assign(this, item)
    }
}