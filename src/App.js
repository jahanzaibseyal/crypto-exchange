import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import './App.css';
import Dashboard from "./Componants/dashboard";
import Blogs from './Componants/blog/blog';
import Register from './Componants/register';
import Login from './Componants/login';
import Header from './Componants/header';

function App() {
  const [user, setUser] = useState(null);
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

  const handleLogout = () => {
    setUser(null);
    window.location.replace('/')
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };


  return (
    <Router>
      <Routes>
        {user ? 
        <Route path="/" element={<Header handleLogout={handleLogout} user={user} />} > 
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>
        :
        <>
          <Route path="/" element={<Login handleLogin={handleLogin}/>} />
          <Route path='/register' element={<Register addUser={addUser}/>} />
        </>

        }
      </Routes>

      
    </Router>
  );
}

export default App;
