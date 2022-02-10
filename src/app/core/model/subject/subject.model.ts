export class Subject {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    standardId: number;
    standardName: string;
    constructor(item: Subject) {
        Object.assign(this, item);
    }
}

export class StandardRate {
    standardId: number; 
    rate: number;
    standardName: string;
    subjects: object;
  
    constructor(item: StandardRate) {
      Object.assign(this, item);
    }
  }
  