export class Notice {
    content: string;
    createdAt: string;
    constructor(item: Notice) {
      Object.assign(this, item)
    }
}
  