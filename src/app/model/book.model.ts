export interface BookModel {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  pdfUrl: string;
  description: string;
  fullVersion: boolean;
  createdAt: Date;
}
