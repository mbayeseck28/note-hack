import { createContext, useContext, useState, useEffect } from "react"

const TodoContext = createContext()

const TodoProvider = ({children}) => {
  const [entree, setEntree] = useState();
  const [textbtn, setTextbtn] = useState('Add');
  const [cleAmodifier, setCleamodif] = useState('');
  const [list, setList] = useState(() => {
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

  
  function addOrUpdate(e) {
    const condition = textbtn === 'Add';
    condition ? ajouter() : modifierSub();
  }

  const ajouter = () => {
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

  const modifier = (cle) => {
    const newList = list.filter((li) => li.id === cle);
    newList.map((li) => {
      setEntree(li.titre);
      setTextbtn('Update');
      setCleamodif(li.id);
    });
  }

  const modifierSub = () => {
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

  const supprimer = (cle) => {
    const newList = list.filter((list) => list.id !== cle);
    setList(newList);
  }

  const changebg = (color) => {
    localStorage.setItem('background', color);
    const bg = document.querySelector('.App');
    let classesActuelles = bg.classList;
    if (classesActuelles.length > 2) {
      let derniereClasse = classesActuelles[classesActuelles.length - 1];
      bg.classList.remove(derniereClasse);
    }
    bg.classList.add(localStorage.getItem('background'));
  }
  

  const contextValue = {
    entree,
    setEntree,  
    list,
    setList,
    textbtn,
    setTextbtn,
    cleAmodifier,
    setCleamodif,
    addOrUpdate,
    modifier,
    supprimer,
    changebg,
  }

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
}

export const useTodoContext = () => useContext(TodoContext)

export default TodoProvider
