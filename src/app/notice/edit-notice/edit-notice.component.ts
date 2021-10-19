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
            isActive: ['', [Validators.required]],
            oldFile: [''],
            file: ['']
        });
        if (data.mode === 'edit') {
            this.editNoticeForm.get('content').setValue(data.notice.content);
            this.editNoticeForm.controls.isActive.setValue(data.notice.isActive);
            if (data.notice.file) {
                this.editNoticeForm.controls.oldFile.setValue(data.notice.file);
            }

        }
        this.isLoading = false;
    }
    ngOnInit(): void {
    }

    onFileChange(event): void {
        if ((event.target as HTMLInputElement).files[0]) {
            let i = 0;
            const file = (event.target as HTMLInputElement).files[0];
            const pattern = [/image-*/, 'application/pdf', 'application/vnd.openxmlformats-officedocument-*'];

            for (const p of pattern) {
                if (file.type.match(p)) {
                   i++;
                }
            }

            if (i === 0) {
                alert('Invalid format');
                return;
            }

            this.editNoticeForm.get('file').setValue(file);
            this.editNoticeForm.get('file').updateValueAndValidity();

            console.log(this.editNoticeForm.value);
        }
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
            const fd = new FormData();
            fd.append('file', this.editNoticeForm.get('file').value);
            fd.append('oldFile', this.editNoticeForm.get('oldFile').value);
            fd.append('content', this.editNoticeForm.get('content').value);
            fd.append('isActive', this.editNoticeForm.get('isActive').value);
            console.log(fd);
            this.noticeService.postEditNotice(fd, this.data.notice.id)
                .subscribe(observer);
        }
        else if (this.data.mode === 'new') {
            const fd = new FormData();
            fd.append('file', this.editNoticeForm.get('file').value);
            fd.append('content', this.editNoticeForm.get('content').value);
            fd.append('isActive', this.editNoticeForm.get('isActive').value);

            this.noticeService.postAddNotice(fd)
                .subscribe(observer);
        }
    }

    closeDialog() {
        console.log("closeDialog")
        this.dialogRef.close();
    }
}
