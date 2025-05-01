import { Routes, Route } from "react-router-dom";
import './style.css'
import Header from "./componets/layouts/Header";
import Footer from './componets/layouts/Footer';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import MyPage from './pages/MyPage';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} /> 
        <Route path='/login' element={<LogIn />} />
        <Route path="/mypage" element={<MyPage />} /> 
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
