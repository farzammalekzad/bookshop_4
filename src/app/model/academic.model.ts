import {BookModel} from "./book.model";

export interface AcademicModel {
  _id: string;
  field: string;
  imageUrl: string;
  description: string;
  books: [BookModel];
}
