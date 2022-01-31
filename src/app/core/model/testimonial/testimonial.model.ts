export class Testimonial {
    id: number;
    userId: number;
    review: Text;
    isActive: boolean;
    createdAt: string;
    firstName: number;
    lastName: string;
    constructor(item: Testimonial) {
        Object.assign(this, item);
    }
}
