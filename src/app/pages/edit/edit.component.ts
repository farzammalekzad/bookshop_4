import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../DTO/book.service';
import {AcademicModel} from '../../model/academic.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  private catSub: Subscription;
  loading = false;
  displayedColumns: string[] = ['field', 'id', 'imageUrl'];
  displayedColumns_2: string[] = ['title', 'id'];
  localCategory: AcademicModel;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bookService: BookService
              ) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((pm) => {
      if (!pm.has('cId')) {
        this.router.navigateByUrl('login');
        return;
      }
      this.catSub = this.bookService.getCurrentCategoryById(pm.get('cId')).subscribe((cat) => {
        this.localCategory = cat;
        this.form = new FormGroup({
          field: new FormControl(cat.field, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          imageUrl: new FormControl(cat.imageUrl, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(cat.description, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
      });
    });
  }

  editCategory() {
    let newCategory: AcademicModel;
    let oldCategory: AcademicModel;
    this.bookService.getCurrentCategoryById(this.localCategory._id).pipe(tap((cat) => {
      oldCategory = cat;
      newCategory = {
        _id: oldCategory._id,
        field: this.form.value.field,
        imageUrl: this.form.value.imageUrl,
        description: this.form.value.description,
        books: oldCategory.books
      };
      return this.bookService.editCategory(newCategory).subscribe((resp) => {
      console.log(resp);
      });
    }));

  }


}
