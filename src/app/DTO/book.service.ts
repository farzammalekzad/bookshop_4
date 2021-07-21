import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AcademicModel} from "../model/academic.model";
import {HttpClient} from "@angular/common/http";
import {finalize, map} from "rxjs/operators";
import {BookModel} from "../model/book.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private category: BehaviorSubject<[AcademicModel]> = new BehaviorSubject<[AcademicModel]>(null);

  constructor(private http: HttpClient) { }

  public getCategory(): Observable<[AcademicModel]> {
    return this.http.get<[AcademicModel]>('http://localhost:3000/academic/category');
  }

  public getCurrentCategory() {
    return this.category;
  }

  public getCurrentCategoryById(id: string): Observable<AcademicModel> {
    return this.getCurrentCategory().pipe(map((ctg) => ctg.find((x) => x._id == id)));
  }

  public setCategory(data) {
    return this.category.next(data);
  }

  public getBooks(id: string): Observable<BookModel[]> {
    return this.getCurrentCategoryById(id).pipe(map((ctg) => ctg.books));
  }

  public getBook(categoryId: string, bookId: string): Observable<BookModel> {
    return this.getBooks(categoryId).pipe(map((books) => books.find(book => book._id == bookId)));
  }

  public uploadImageBook(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);
    return this.http.post<string>('http://localhost:3000/upload/image', uploadData);
  }

  public uploadBook(book: File) {
    const uploadData = new FormData();
    uploadData.append('book', book);
    return this.http.post<string>('http://localhost:3000/upload/book', uploadData);
  }


}
