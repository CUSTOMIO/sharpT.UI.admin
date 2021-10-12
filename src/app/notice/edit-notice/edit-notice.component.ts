import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoticeService } from 'src/app/core/dataService';


@Component({
    templateUrl: './edit-notice.component.html',
    styleUrls: ['./edit-notice.component.scss']
})

export class EditNoticeComponent implements OnInit {
        private editNoticeForm: FormGroup;
        public isLoading = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { notice: any, mode: string },
        private dialogRef: MatDialogRef<EditNoticeComponent>,
        private formBuilder: FormBuilder,
        private noticeService: NoticeService
    ) {
        this.editNoticeForm = formBuilder.group({
            content: ['', [Validators.required]],
            isActive: ['', [Validators.required]]
        });
        if (data.mode === 'edit') {
            this.editNoticeForm.get('content').setValue(data.notice.content);
            this.editNoticeForm.controls.isActive.setValue(data.notice.isActive);
        }
        this.isLoading = false;
    }
    ngOnInit(): void {
    }

    onSubmit() {
        if (!this.editNoticeForm.valid) {
            return;
        }
        this.isLoading = true;

        const observer = {
            next: (x) => {
                console.log(x);
                if (x.message !== null) {
                    this.dialogRef.close({ data: x.message });
                }
                this.isLoading = false;
            },
            error: err => {
                console.error(err);
                this.isLoading = false;
            }
        };
        if (this.data.mode === 'edit') {
            console.log(this.editNoticeForm.value)
            this.noticeService.postEditNotice(this.editNoticeForm.value, this.data.notice.id)
                .subscribe(observer);
        }
        else if (this.data.mode === 'new') {
            this.noticeService.postAddNotice(this.editNoticeForm.value)
                .subscribe(observer);
        }
    }

    closeDialog() {
        console.log("closeDialog")
        this.dialogRef.close();
    }
}
