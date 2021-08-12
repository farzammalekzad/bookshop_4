import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AcademicModel} from '../model/academic.model';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {BookModel} from '../model/book.model';
import {RespModel} from '../model/resp.model';
import {BookreqModel} from '../model/bookreq.model';
import {SearchBookModel} from '../model/searchBook.model';
import {AppsModel} from '../model/apps.model';

interface BookData {
  title: string;
  author: string;
  imageUrl: string;
  pdfUrl: string;
  description: string;
  fullVersion: boolean;
}

interface RespPostBook {
  message: string;
  status: string;
  book: BookModel;

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
    return this.http.get<[AcademicModel]>('/academic/category');
  }

  public getCurrentCategory() {
    return this.category.asObservable();
  }

  public getCurrentCategoryById(id: string): Observable<AcademicModel> {
    return this.getCurrentCategory().pipe(map((ctg) => ctg.find((x) => x._id === id)));
  }

  public setCategory(data) {
    return this.category.next(data);
  }

  public getBooks(id: string): Observable<BookModel[]> {
    return this.getCurrentCategoryById(id).pipe(map((ctg) => ctg.books));
  }

  public getBook(categoryId: string, bookId: string): Observable<BookModel> {
    return this.getBooks(categoryId).pipe(map((books) => books.find(book => book._id === bookId)));
  }

  public getAllBooks(): Observable<[BookModel][]> {
    return this.category.pipe(map((cats) => cats.map((books) => books.books)));
  }


  public uploadImageBook(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);
    return this.http.post<string>('/upload/image', uploadData);
  }

  public uploadBook(book: File) {
    const uploadData = new FormData();
    uploadData.append('book', book);
    return this.http.post<string>('/upload/book', uploadData);
  }

  public sendBook(title: string, author: string, imageUrl: string, pdfUrl: string, description: string, fullVersion: boolean, categoryId) {
    const newBook: BookData = {
      title,
      author,
      imageUrl,
      pdfUrl,
      description,
      fullVersion,
    };
    return this.http.post<RespPostBook>(`/academic/category/${categoryId}`, newBook);
  }

  public setNewCategory(field: string, imageUrl: string, description: string) {
    const newCategory: CategoryData = {
      field,
      imageUrl,
      description
    };
    return this.http.post<RespModel>('/academic/category', newCategory);
  }

  public deleteCategory(categoryId: any) {
    return this.http.delete<RespModel>(`/academic/category/${categoryId}`);
  }

  public deleteBook(categoryId: string, bookId: string) {
    return this.http.delete<RespModel>(`/academic/${categoryId}/books/${bookId}`);
  }

   public editCategory(newCategory: AcademicModel) {
      return this.http.put<RespModel>(`/academic/category/${newCategory._id}`, newCategory);

   }

   public requestBook(Data: BookreqModel) {
    return this.http.post<RespModel>('/request', Data);
   }

   public getRequest() {
    return this.http.get<BookreqModel[]>('/request');
   }

   public searchBook(title: string) {
    return this.http.post<SearchBookModel[]>('/search', {title});
   }

   public getApps() {
    return this.http.get<AppsModel[]>('/apps');
   }

  public sendApp(name: string, imageUrl: string, description: string, appDownloadLink: string) {
    const newApp: AppsModel = {
      id: null,
      name,
      imageUrl,
      description,
      bazaarLink: appDownloadLink
    };
    return this.http.post<RespModel>(`/apps`, newApp);
  }

  public deleteApp(id: string) {
    return this.http.delete<RespModel>(`/apps/${id}`);
  }
}
