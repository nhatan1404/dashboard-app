import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface IProps {
  tableName: string;
  linkCreate: string;
}

const TableHeader = ({ tableName, linkCreate }: IProps) => {
  return (
    <header className='card-header'>
      <p className='card-header-title'>
        <span className='icon'>
          <i className='mdi mdi-account-multiple' />
        </span>
        {tableName}
      </p>
      <Link to={linkCreate} className='card-header-icon'>
        <button
          className='inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 p-2 bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
          type='button'
        >
          <span className='icon'>
            <MdAdd size={22} />
          </span>
          <span className='pr-1'>Thêm</span>
        </button>
      </Link>
    </header>
  );
};

export default TableHeader;
