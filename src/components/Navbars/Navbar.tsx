import { connect, ConnectedProps } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  MdLogout,
  MdMenu,
  MdMoreVert,
  MdClose,
  MdInfoOutline,
  MdSettings,
} from 'react-icons/md';
import { PATH } from '../../constants/paths';
import {
  toggleNavbarDropdown,
  toggleNavbarMobile,
  toggleNavbarMenuMobile,
} from '../../app/App.actions';
import { logout } from '../../pages/Auth/Auth.thunks';

const mapStateToProps = (state: AppState) => ({
  isOpenDropdown: state.app.isOpenDropdown,
  isExpanded: state.app.isExpanded,
  isOpenMenu: state.app.isOpenMenu,
});

const mapDispatchToProps = {
  toggleNavbarDropdown,
  toggleNavbarMobile,
  toggleNavbarMenuMobile,
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const Navbar = ({
  isOpenDropdown,
  isExpanded,
  isOpenMenu,
  toggleNavbarDropdown,
  toggleNavbarMobile,
  toggleNavbarMenuMobile,
  logout,
}: Props) => {
  const history = useHistory();
  const handleLogout = (): void => {
    logout();
    history.push(PATH.HOME);
  };

  return (
    <>
      {/* Navbar */}
      <nav id='navbar-main' className='navbar is-fixed-top'>
        <div className='navbar-brand'>
          <span
            onClick={toggleNavbarMobile}
            className={`navbar-item mobile-aside-button${
              isExpanded ? ' aside-mobile-expanded' : ''
            }`}
          >
            <span className='icon'>
              {isExpanded ? <MdClose /> : <MdMenu />}
            </span>
          </span>
          <div className='navbar-item'>
            <div className='control'>
              <input placeholder='Tìm kiếm' className='input' />
            </div>
          </div>
        </div>
        <div className='navbar-brand is-right'>
          <span
            onClick={toggleNavbarMenuMobile}
            className='navbar-item --jb-navbar-menu-toggle'
          >
            <span className='icon'>
              {isOpenMenu ? <MdClose /> : <MdMoreVert />}
            </span>
          </span>
        </div>
        <div
          className={`navbar-menu${isOpenMenu ? ' active' : ''}`}
          id='navbar-menu'
        >
          <div className='navbar-end'>
            <div
              onClick={toggleNavbarDropdown}
              className={`navbar-item dropdown has-divider has-user-avatar${
                isOpenDropdown ? ' active' : ''
              }`}
            >
              <span className='navbar-link'>
                <div className='user-avatar'>
                  <img
                    src='https://avatars.dicebear.com/v2/initials/john-doe.svg'
                    alt='John Doe'
                    className='rounded-full'
                  />
                </div>
                <div className='is-user-name'>
                  <span>Nhật An</span>
                </div>
                <span className='icon'>
                  <i className='mdi mdi-chevron-down'></i>
                </span>
              </span>
              <div className='navbar-dropdown'>
                <Link
                  to={PATH.PROFILE}
                  className='navbar-item --set-active-profile-html'
                >
                  <span className='icon'>
                    <MdInfoOutline />
                  </span>
                  <span>Tài khoản</span>
                </Link>
                <Link to={PATH.SETTING} className='navbar-item'>
                  <span className='icon'>
                    <MdSettings />
                  </span>
                  <span>Cài đặt</span>
                </Link>
                <hr className='navbar-divider' />
                <div onClick={handleLogout} className='navbar-item'>
                  <span className='icon'>
                    <MdLogout />
                  </span>
                  <span>Đăng xuất</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* End Navbar */}
    </>
  );
};

export default connector(Navbar);
