import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/Navbar';
import Footer from '../components/Footer/Footer';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <ToastContainer />
      <AdminNavbar />
      <Sidebar />
      <main className='my-4'>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
