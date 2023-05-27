import Footer from './footer';
import Header from './header';
import Dashboard from './dashboard';
import Register from './register';
import Login from './login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Layout() {
  const [user, setUser] = useState(null);
  const [showRegisterationForm, setShowRegisterationForm] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState({});
  const [users, setUsers] = useState([
    {
      firstName: 'Hafiz Muhammad',
      lastName: 'Jahanzaib',
      email: 'admin@gmail.com',
      password: 'admin',
    },
  ]);

  const handleLogin = (credentials) => {
    const { email, password } = credentials;
    // setLoginAttempt({ ...loginAttempt, [email]: 0 });
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (loginAttempt?.[email] > 3) {
      toast('This account is blocked. Please contact admin.');
      return;
    }

    if (user) {
      setUser(user);
      toast.info('Logged in successfully');
      setLoginAttempt({ ...loginAttempt, [email]: 0 });
      return;
    }

    if (email) {
      let attemptCount = 1;

      if (email in loginAttempt) {
        attemptCount = loginAttempt[email] + 1;
        setLoginAttempt({ ...loginAttempt, [email]: attemptCount });
      } else {
        setLoginAttempt({ ...loginAttempt, [email]: attemptCount });
      }

      if (attemptCount < 3) {
        toast.info(`Wrong Password! ${attemptCount}/3 attempts!`);
        return;
      }

      toast.info('Wrong Password! This account is blocked.');
      return;
    }

    toast.info('User not found');
  };

  const handleLogout = (user) => {
    setUser(null);
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const handleLoginRegisterSwitch = () => {
    setShowRegisterationForm(!showRegisterationForm);
    setShowLoginForm(!showLoginForm);
  };

  return (
    <>
      {user ? (
        <>
          <Header handleLogout={handleLogout} user={user} />
          <Dashboard />
          <Footer />
        </>
      ) : (
        <>
          {showLoginForm && (
            <Login
              handleLogin={handleLogin}
              handleLoginRegisterSwitch={handleLoginRegisterSwitch}
            />
          )}
          {showRegisterationForm && (
            <Register
              addUser={addUser}
              handleLoginRegisterSwitch={handleLoginRegisterSwitch}
            />
          )}
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default Layout;
