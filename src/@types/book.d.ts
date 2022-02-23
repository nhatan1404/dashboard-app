interface IBook {
  id: number;
  title: string;
  description: string;
  slug: string;
  quantity: number;
  sold?: number;
  page_number?: number;
  images?: string;
  status: Status;
  price: number;
  discount?: number;
  publication_date?: Date | string;
  reprint_date?: Date | string;
  category: ICategory;
  author: IAuthor;
  publisher: IPublisher;
  language: ILanguage;
  created_at?: string;
  updated_at?: string;
}

interface IBookPayload {
  title: string;
  description: string;
  quantity: number;
  sold?: number;
  page_number?: number;
  images?: string;
  status: Status;
  price: number;
  discount?: number;
  publication_date?: Date | string;
  reprint_date?: Date | string;
  category_id: number | string;
  author_id: number;
  publisher_id: number;
  language_id: number;
}

interface ResGetBookApi extends Res {
  data: {
    books: Book[];
  };
}

interface ResGetBook extends ActionRedux {
  payload: ResGetBookApi;
}

interface ResGetBookItemApi extends Res {
  data: {
    book: Book;
  };
}

interface ResGetBookItem extends ActionRedux {
  payload: ResGetBookItemApi;
}
