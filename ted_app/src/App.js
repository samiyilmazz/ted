import React from 'react';
import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom';

import EditNotes from './pages/EditNotes';
import Main from './pages/Main';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/edit-notes/:id' element={<EditNotes/>}/>
      </Routes>
    </Router>
  );
}

export default App;
