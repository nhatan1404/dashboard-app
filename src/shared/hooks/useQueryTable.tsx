import { useState } from 'react';

export interface IQueryTable {
  page: number;
  limit: number;
  keyword?: string;
}

export type HandleQueryTable = React.Dispatch<
  React.SetStateAction<IQueryTable>
>;

export const useQueryTable = (
  query: IQueryTable = { page: 1, limit: 10 },
): (IQueryTable | React.Dispatch<React.SetStateAction<IQueryTable>>)[] => {
  const [queryTable, setQueryTable] = useState<IQueryTable>(query);
  return [queryTable, setQueryTable];
};
