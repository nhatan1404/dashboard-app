interface ILanguage {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ILanguagePayload {
  name: string;
}

interface ResListLanguageApi extends Res {
  data: {
    languages: ILanguage[];
  };
}

interface ResGetListLanguage extends ActionRedux {
  payload: ResLanguageApi;
}

interface ResGetLanguageItemApi extends Res {
  data: {
    language: ILanguage;
  };
}

interface ResGetLanguageItem extends ActionRedux {
  payload: ResGetLanguageItemApi;
}
