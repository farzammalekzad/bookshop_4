import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../DTO/book.service";

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.scss']
})
export class AddCatComponent implements OnInit {

  form: FormGroup;
  imageDownloadLink: string;
  loading: boolean = false;
  @ViewChild('fform') formDirective;


  constructor(public bookService: BookService) {
    this.form = new FormGroup({
      field: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      imageUrl: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(10)]
      })
    });
  };

  ngOnInit(): void {
  }

  onImageSelected(event) {
    this.loading = true;
    const file: File = (event.target as HTMLInputElement).files[0];
    this.bookService.uploadImageBook(file).subscribe((link) => {
      this.imageDownloadLink = link;
      this.loading = false;
    });
  }

  addCategory() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500);
    this.bookService.setNewCategory(
      this.form.value.field,
      this.form.value.imageUrl,
      this.form.value.description
    ).subscribe((resData) => {
      console.log(resData);
      this.form.reset({
        field: '',
        imageUrl: '',
        description: ''
      });
      this.formDirective.resetForm();
    });
  }

}
