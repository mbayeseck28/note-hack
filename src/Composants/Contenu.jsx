import React from 'react'
import './styles.css';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

// Mon composant carte
const Carte = ({titre, date, handleUpdate, handleDelete, id}) => {
    return(
        <div className="col-md-4 col-sm-6 mb-3">
            <div className="card border-top-0 border-end-0 border-5 border-primary border-bottom-0 shadow ">
                <div className="card-body border border-top-0 border-end-0 boder-start-0">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4 className="card-title fs-6 fw-semibold">{titre}</h4>
                        <span className='d-flex '>
                            <button className='btn btn-transparent pt-0 pe-2 text-primary' onClick={() => handleUpdate(id)}><FaPencil /></button>
                            <button className='btn btn-transparent pt-0 px-0 text-danger' onClick={() => handleDelete(id)}><MdDelete /></button>
                        </span>
                    </div>
                    <p className="card-text petitText text-secondary pe-4">{date}</p>
                </div>
            </div>
        </div>
    )
}

const Contenu = ({tableau, setter, handleUpdate, handleDelete}) => {
    function clearAll(e) {
        e.preventDefault()
        setter([])
    }

  return (
    <div className="card shadow">
        <div className="card-header d-flex justify-content-between">
            <div className='d-flex gap-2 py-4 align-items-center'> 
                <h5>Notes</h5>
                <span className="btn  rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center fw-semibold">{tableau.length}</span>
            </div>
            <div className='d-flex align-items-center'>
                <button className='btn btn-primary h-50' onClick={clearAll}>Clear All</button>
            </div>
        </div>
        <div className="card-body">
            <div className="row p-3 d-flex justify-content-center">
                {
                    tableau.map((element) => <Carte titre={element.titre} date={element.date} handleUpdate={handleUpdate} handleDelete={handleDelete} id={element.id} />)
                }
            </div>
        </div>
    </div>
  )
}

export default Contenu
