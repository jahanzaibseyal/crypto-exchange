import Footer from './footer';
import Header from './header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

function Layout(handleLogout, user) {
  return (
    <>
      <Header handleLogout={handleLogout} user={user} />
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default Layout;
