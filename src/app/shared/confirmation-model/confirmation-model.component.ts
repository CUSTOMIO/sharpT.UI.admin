import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-model',
    templateUrl: 'confirmation-model.component.html'
})

export class ConfirmationModelComponent implements OnInit {

    public modelBody: string;
    public modelHeading: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmationModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.modelBody = data.modelBody,
            this.modelHeading = data.modelHeading;
    }

    public ngOnInit() {

    }

    public cancel(){

    }

    public confirm(){

    }
}
