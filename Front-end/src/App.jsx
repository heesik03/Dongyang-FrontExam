import { Routes, Route } from "react-router-dom";
import Header from "./componets/layouts/Header";
import Footer from './componets/layouts/Footer';

import Home from './pages/Home';
import Note from "./pages/Note";
import NoteRead from "./pages/NoteRead";
import NoteWrite from "./pages/NoteWrite";
import NoteUpdate from "./pages/NoteUpdate";

import './style.css'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>
        <Route path="*" element={<Home />} /> 
        <Route path="/note" element={<Note />} /> 
        <Route path="/note/:id" element={<NoteRead />} /> 
        <Route path="/note/write" element={<NoteWrite />} /> 
        <Route path="/note/update/:id" element={<NoteUpdate />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
