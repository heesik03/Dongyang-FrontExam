import { Routes, Route } from "react-router-dom";
import Header from "./componets/layouts/Header";
import Footer from './componets/layouts/Footer';

import Home from './pages/Home';
import Note from "./pages/Note";
import NoteRead from "./pages/NoteRead";
import NoteWrite from "./pages/NoteWrite";
import NoteUpdate from "./pages/NoteUpdate";

import './style.css'

const routes = [
  {
    path : "*",
    element : <Home />
  },
  {
    path : "/note",
    element : <Note />
  },
  {
    path : "/note/:id",
    element : <NoteRead />
  },
  {
    path : "/note/write",
    element : <NoteWrite />
  },
  {
    path : "/note/update/:id",
    element : <NoteUpdate />
  },
]

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>
      {
        routes.map(route => {
          return <Route key={route.path} path={route.path} element={route.element} />;
        })
      }
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
