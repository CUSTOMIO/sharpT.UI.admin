export class ExaminationSubjectDetail {
    id: number;
    subjectId: number;
    outOf: number;
  constructor(item: ExaminationSubjectDetail ) {
        Object.assign(this, item);
    }
}
