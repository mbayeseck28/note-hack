// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Composants/Header';
import Formulaire from './Composants/Formulaire';
import Contenu from './Composants/Contenu';
import { useState, useEffect } from 'react';

function App() {
  const [entree, setEntree] = useState('');
  const [textbtn, setTextbtn] = useState('Add');
  const [cleAmodifier, setCleamodif] = useState('');
  const [list, setList] = useState(() => {
    // Initialisez avec les données du localStorage ou un tableau vide par défaut
    const localStorageUsers = localStorage.getItem('list');
    return localStorageUsers ? JSON.parse(localStorageUsers) : [];
  });

  useEffect(() => {
    document.title = 'Note Hack';
    const bg = document.querySelector('.App');
    bg.classList.add(localStorage.getItem('background'));
  }, []);

  useEffect(() => {
    // Mettre à jour le localStorage à chaque changement de list
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]); // Ce useEffect s'exécute à chaque changement de list

  function handleChange(e) {
    e.preventDefault();
    setEntree(e.target.value);
  }

  function addOrUpdate(e) {
    const condition = textbtn === 'Add';
    condition ? ajouter(e) : modifier(e);
  }

  function ajouter(e) {
    e.preventDefault();
    let currentDate = new Date();
    const dateObject = {
      hour: currentDate.getHours().toString().padStart(2, '0'),
      minutes: currentDate.getMinutes().toString().padStart(2, '0'),
      seconds: currentDate.getSeconds().toString().padStart(2, '0'),
      day: currentDate.getDate().toString().padStart(2, '0'),
      month: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
      year: currentDate.getFullYear(),
    };
    const date = `${dateObject.hour}:${dateObject.minutes}:${dateObject.seconds} ${dateObject.day}/${dateObject.month}/${dateObject.year}`;

    const nouveauElement = {
      id: Math.floor(Math.random() * 1000000000),
      titre: entree,
      date: date,
    };
    if (nouveauElement.titre !== '') {
      setList((prev) => [...prev, nouveauElement]);
    }
    setEntree('');
  }

  function modifier(e) {
    e.preventDefault();

    const newList = list.map((item) => {
      if (item.id === cleAmodifier) {
        return {
          ...item,
          titre: entree,
        };
      }
      return item;
    });

    setList(newList);
    setEntree('');
    setTextbtn('Add');
  }

  function handleUpdate(cle) {
    const newList = list.filter((li) => li.id === cle);
    newList.map((li) => {
      setEntree(li.titre);
      setTextbtn('Update');
      setCleamodif(li.id);
    });
  }

  function supprimer(cle) {
    const newList = list.filter((list) => list.id !== cle);
    setList(newList);
  }

  function changebg(color) {
    localStorage.setItem('background', color);
    const bg = document.querySelector('.App');
    let classesActuelles = bg.classList;
    if (classesActuelles.length > 2) {
      let derniereClasse = classesActuelles[classesActuelles.length - 1];
      bg.classList.remove(derniereClasse);
    }
    bg.classList.add(localStorage.getItem('background'));
    // ____
    // const btn = document.querySelectorAll('.btn-bg');
    // for (var i = 0; i < btn.length; i++) {
    //   const btnActuelles = btn[i].classList;
    //   for (let i = 0; i < btnActuelles.length; i++) {
    //     const element = btnActuelles[i];
    //     // console.log(element);
    //     if (element === color) {
    //       element.classList.add('btn-backG');
    //       console.log('Je lai trouvé');
    //     }
    //   }
    //   // Faire quelque chose avec chaque élément, par exemple, afficher le contenu
    //   // btn[i].classList.add('btn-backG');
    //   // if (btnActuelles.length > 5) {
    //   //   btn[i].computedStyleMap.width = '30px';
    //   //   btn[i].computedStyleMap.height = '30px';
    //   // }
    //   // console.log(btnActuelles);
    // }
  }

  return (
    <div className="App py-4">
      <div className="container">
        <Header changebg={changebg} />
        <Formulaire
          handleChange={handleChange}
          handleSubmit={addOrUpdate}
          val={entree}
          textBtn={textbtn}
        />
        <Contenu
          tableau={list}
          setter={setList}
          handleUpdate={handleUpdate}
          handleDelete={supprimer}
        />
      </div>
    </div>
  );
}

export default App;
