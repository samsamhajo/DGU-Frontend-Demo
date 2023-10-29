import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import SignUpComplete from './pages/SignUpComplete';
import Confirmation from './pages/Confirmation';
import StudentSimulation from './pages/StudentSimulation';
import UserList from './pages/UserList'; // 추가된 줄
import UserDetail from './pages/UserDetail'; // 추가된 줄

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-complete" element={<SignUpComplete />} />
        <Route path="/student-simulation" element={<StudentSimulation />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/user-list" element={<UserList />} /> {/* 추가된 줄 */}
        <Route path="/user/:id" element={<UserDetail />} /> {/* 추가된 줄 */}
      </Routes>
    </Router>
  );
};

export default App;
