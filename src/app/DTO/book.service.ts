import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AcademicModel} from "../model/academic.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BookModel} from "../model/book.model";
import {RespModel} from "../model/resp.model";

interface BookData {
  title: string;
  author: string;
  imageUrl: string;
  pdfUrl: string;
  description: string;
  fullVersion: boolean;
}

interface CategoryData {
  field: string;
  imageUrl: string;
  description: string;
}

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

  public sendBook(title: string, author: string, imageUrl: string, pdfUrl: string, description: string, fullVersion: boolean, categoryId) {
    const newBook: BookData = {
      title,
      author,
      imageUrl,
      pdfUrl,
      description,
      fullVersion
    };
   return this.http.post<BookModel>(`http://localhost:3000/academic/category/${categoryId}`, newBook);
  }

  public setNewCategory(field: string, imageUrl: string, description: string) {
    const newCategory: CategoryData = {
      field,
      imageUrl,
      description
    }
  return this.http.post<AcademicModel>('http://localhost:3000/academic/category', newCategory);
  }

  public deleteCategory(categoryId: any) {
    return this.http.delete<RespModel>(`http://localhost:3000/academic/category/${categoryId}`);
  }

}
