interface IReview {
  id: number;
  commment: string;
  score: number;
  book: IBook;
  user: IUser;
  created_at?: string;
  updated_at?: string;
}
