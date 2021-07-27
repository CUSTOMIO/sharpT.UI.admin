export class Otp {
    firstName: string;
    middleName: string;
    email: string;
    otp: string;
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    constructor(item: Otp) {
        Object.assign(this, item)
    }
}