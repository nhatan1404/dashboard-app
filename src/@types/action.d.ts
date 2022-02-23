interface ActionRedux {
  types: string;
  payload?: any;
}

type ActionCreate<TP> = (p: TP) => { type: string, payload: TP };