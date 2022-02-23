interface IProps {
  columns: ColumnTable[];
}

const TableHead = ({ columns }: IProps) => {
  return (
    <thead>
      <tr>
        {columns &&
          columns.map((col) => <th key={col.accessor}>{col.header}</th>)}
      </tr>
    </thead>
  );
};

export default TableHead;
