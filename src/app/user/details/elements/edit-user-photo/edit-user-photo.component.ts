import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/dataService';

@Component({
    templateUrl: './edit-user-photo.component.html',
    styleUrls: ['./edit-user-photo.component.scss'],
})
export class EditUserPhotoComponent implements OnInit {

    public imageURL: string;
    public imageForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {  userId: any, imageUrl: string},
        private dialogRef: MatDialogRef<EditUserPhotoComponent>,
        private formBuilder: FormBuilder,
        private userService: UserService) {
    }

    ngOnInit() {
      this.imageForm = this.formBuilder.group({
        image: [, Validators.required],
        userId: [, [Validators.required]]
      });
    }

    public showPreview(event) {
        if ((event.target as HTMLInputElement).files[0]) {
            const file = (event.target as HTMLInputElement).files[0];
            const pattern = /image-*/;

            if (!file.type.match(pattern)) {
                alert('Invalid format');
                return;
            }
            this.imageForm.get('image').setValue(file);
            this.imageForm.get('image').updateValueAndValidity();
            const reader = new FileReader();

            reader.onload = () => {
              //  this.imageURL = reader.result as string;
            // this.appForm.get('imageBase64').setValue(this.imageURL)
          };
            reader.readAsDataURL(file);
        }
        this.updateImage();
      }

    closeDialog() {
        this.dialogRef.close();
    }

    updateImage(){
      const fd = new FormData();
      fd.append('image',  this.imageForm.controls.image.value);
      fd.append('userId',  this.data.userId);
      fd.append('oldImageUrl',  this.data.imageUrl);

      this.userService.postUserImage(fd)
      .subscribe(res => {
        console.log(res);
        if (res.message) {
          this.closeDialog();
        }
      });
  }

}


