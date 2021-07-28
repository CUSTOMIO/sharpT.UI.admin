export class UserStandard {
    id: number;
    name: string;

    constructor(item: UserStandard) {
        Object.assign(this, item);
    }
}

