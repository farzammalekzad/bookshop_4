import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../DTO/book.service';
import {BookreqModel} from '../../model/bookreq.model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  form: FormGroup;
  loading = false;
  @ViewChild('SwalSuccess') public readonly SwalSuccess: SwalComponent;
  @ViewChild('SwalFail') public readonly SwalFail: SwalComponent;


  constructor(private bookService: BookService) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      author: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      mobile: new FormControl(null, {
        updateOn: 'blur',
      }),
      description: new FormControl(null, {
        updateOn: 'blur'
      }),
    });
  }

  ngOnInit(): void {
  }

  sendRequest() {
    this.loading = true;
    const bookData: BookreqModel = {
      _id: null,
      title: this.form.value.title,
      author: this.form.value.author,
      email: this.form.value.email,
      mobile: this.form.value.mobile,
      description: this.form.value.description,
      status: false
    };
    this.bookService.requestBook(bookData).subscribe((resp) => {
      this.loading = false;
      this.SwalSuccess.fire();
      this.form.reset();
      console.log(resp);
    }, error => {
      this.loading = false;
      this.SwalFail.fire();
      console.log(error);
    });

  }

}
