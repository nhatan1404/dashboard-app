import { Link } from 'react-router-dom';
import { PATH } from '../../constants/paths';
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  value: LinkBreadcrumb[];
}

const Breadcrumb = ({ value }: Props) => {
  return (
    <section className='is-hero-bar'>
      <div className='flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0'>
        <nav className='flex bg-white'>
          <ol className='inline-flex items-center space-x-1 md:space-x-2'>
            <Link
              to={PATH.HOME}
              className='text-gray-700 hover:text-gray-900 inline-flex items-center'
            >
              <span className='text-gray-500 mx-2'>
                <MdHome size={24} />
              </span>
              Trang Chủ
            </Link>
            {value.length > 0 &&
              value.map((link, index) => (
                <li key={index} className='inline-flex items-center'>
                  <Link
                    to={link.link}
                    className='text-gray-700 hover:text-gray-900 inline-flex items-center'
                  >
                    {!link.isLast && (
                      <span className='text-gray mr-2'>
                        <MdKeyboardArrowRight size={24} />
                      </span>
                    )}
                    {link.title}
                  </Link>
                </li>
              ))}
            {}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
