import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../DTO/book.service';
import {SearchBookModel} from '../../model/searchBook.model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  findingBooks: SearchBookModel[];
  loading = false;
  displayedColumns: string[] = ['title', 'author', 'language'];
  @ViewChild('SwalSuccess') public readonly SwalSuccess: SwalComponent;
  @ViewChild('SwalFail') public readonly SwalFail: SwalComponent;

  constructor(private bookService: BookService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      })
    });
  }

  ngOnInit(): void {
  }

  async search() {
    this.loading = true;
    const title = this.form.value.title;
    return this.bookService.searchBook(title).subscribe((books) => {
      this.findingBooks = books;
      this.SwalSuccess.fire();
      this.loading = false;
    }, error => {
      this.loading = false;
      this.SwalFail.fire();
    });


  }

}
