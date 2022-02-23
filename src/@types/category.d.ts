interface ICategory {
  id: number;
  title: string;
  note: string | null;
  parent_id: null | number;
  parent: ICategory;
  children?: ICategory[];
}

interface IParentCategory extends ICategory {}

interface ICategoryPayload {
  title: string;
  note?: string | null;
  parent_id?: null | number;
}

interface ResGetCategoryApi extends Res {
  data: {
    categories: ICategory[];
  };
}

interface ResGetCategory extends ActionRedux {
  payload: ResGetCategoryApi;
}

interface ResGetCategoryItemApi extends Res {
  data: {
    category: ICategory;
  };
}

interface ResGetCategoryItem extends ActionRedux {
  payload: ResGetCategoryItemApi;
}
