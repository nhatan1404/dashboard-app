/*eslint-disable*/
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/paths';
import {
  MdDashboard,
  MdPerson,
  MdMargin,
  MdTranslate,
  MdMenuBook,
} from 'react-icons/md';
import { RiCoupon2Line } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';

export default function Sidebar() {
  return (
    <>
      <aside className='aside is-placed-left is-expanded'>
        <div className='aside-tools'>
          <div className='text-center'>ABCBOOK</div>
        </div>
        <div className='menu is-menu-main'>
          <p className='menu-label'>General</p>
          <ul className='menu-list'>
            <li className='--set-active-index-html'>
              <Link to={PATH.HOME}>
                <span className='icon'>
                  <MdDashboard />
                </span>
                <span className='menu-item-label'>Dashboard</span>
              </Link>
            </li>
          </ul>
          <p className='menu-label'>SHOP</p>
          <ul className='menu-list'>
            <li className='--set-active-tables-html'>
              <Link to={PATH.BOOK.INDEX}>
                <span className='icon'>
                  <MdMenuBook />
                </span>
                <span className='menu-item-label'>Sách</span>
              </Link>
            </li>
            <li className='--set-active-forms-html'>
              <Link to={PATH.CATEGORY.INDEX}>
                <span className='icon'>
                  <BiCategory />
                </span>
                <span className='menu-item-label'>Danh Mục</span>
              </Link>
            </li>
            <li className='--set-active-profile-html'>
              <Link to={PATH.AUTHOR.INDEX}>
                <span className='icon'>
                  <MdPerson />
                </span>
                <span className='menu-item-label'>Tác Giả</span>
              </Link>
            </li>
            <li>
              <Link to={PATH.PUBLISHER.INDEX}>
                <span className='icon'>
                  <MdMargin />
                </span>
                <span className='menu-item-label'>Nhà Xuất Bản</span>
              </Link>
            </li>
            <li>
              <Link to={PATH.LANGUAGE.INDEX}>
                <span className='icon'>
                  <MdTranslate />
                </span>
                <span className='menu-item-label'>Ngôn Ngữ</span>
              </Link>
            </li>
            <li>
              <Link to={PATH.COUPON.INDEX}>
                <span className='icon'>
                  <RiCoupon2Line />
                </span>
                <span className='menu-item-label'>Mã Giảm Giá</span>
              </Link>
            </li>
            <li>
              <Link to={PATH.USER.INDEX}>
                <span className='icon'>
                  <HiUserGroup />
                </span>
                <span className='menu-item-label'>Tài Khoản</span>
              </Link>
            </li>
            {/* <li>
              <a className='dropdown'>
                <span className='icon'>
                  <i className='mdi mdi-view-list'></i>
                </span>
                <span className='menu-item-label'>Submenus</span>
                <span className='icon'>
                  <i className='mdi mdi-plus'></i>
                </span>
              </a>
              <ul>
                <li>
                  <a href='#void'>
                    <span>Sub-item One</span>
                  </a>
                </li>
                <li>
                  <a href='#void'>
                    <span>Sub-item Two</span>
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
          <p className='menu-label'>About</p>
          <ul className='menu-list'>
            <li></li>
            <li>
              <a
                href='https://justboil.me/tailwind-admin-templates'
                className='has-icon'
              >
                <span className='icon'>
                  <i className='mdi mdi-help-circle'></i>
                </span>
                <span className='menu-item-label'>About</span>
              </a>
            </li>
            <li>
              <a
                href='https://github.com/justboil/admin-one-tailwind'
                className='has-icon'
              >
                <span className='icon'>
                  <i className='mdi mdi-github-circle'></i>
                </span>
                <span className='menu-item-label'>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
