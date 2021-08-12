import {Component, OnInit, ViewChild} from '@angular/core';
import {AppsModel} from '../../model/apps.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../DTO/book.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  @ViewChild('SwalSuccess') public readonly SwalSuccess: SwalComponent;
  @ViewChild('SwalFail') public readonly SwalFail: SwalComponent;
  loading = false;
  form: FormGroup;
  imageDownloadLink: string;

  constructor(private bookService: BookService) {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      imageUrl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      appDownloadLink: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
  }

  sendApp() {
    this.loading = true;
    this.bookService.sendApp(
      this.form.value.name,
      this.form.value.imageUrl,
      this.form.value.description,
      this.form.value.appDownloadLink
    ).subscribe((resp) => {
      this.loading = false;
      this.SwalSuccess.fire();
      this.form.reset();
      console.log(resp);
    }, error => {
      this.loading = false;
      this.SwalFail.fire();
    });

  }

  onImageSelected(event) {
    this.loading = true;
    const file: File = (event.target as HTMLInputElement).files[0];
    this.bookService.uploadImageBook(file).subscribe((link) => {
      this.imageDownloadLink = link;
      this.loading = false;
    });

  }

}
