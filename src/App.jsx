// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Composants/Header';
import Formulaire from './Composants/Formulaire';
import Contenu from './Composants/Contenu';
// import { useState, useEffect } from 'react';
import TodoProvider from './providers/TodoProvider';

function App() {
  return (
    <div className="App py-4">
      <div className="container">
        <TodoProvider>
          <Header />
          <Formulaire />
          <Contenu />
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;
