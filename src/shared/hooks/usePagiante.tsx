import { useState } from 'react';

export function usePagiante(
  value: number = 1,
): (number | React.Dispatch<React.SetStateAction<number>>)[] {
  const [page, setPage] = useState<number>(value);
  return [page, setPage];
}

export type onPaginate = React.Dispatch<React.SetStateAction<number>>;
