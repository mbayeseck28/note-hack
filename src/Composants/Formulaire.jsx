import React from 'react'

const Formulaire = ({handleChange, handleSubmit, val, textBtn}) => {
  return (
    <div className='bg-white rounded my-5 card shadow'>
        <div className='card-body'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex justify-content-between w-100 gap-2 mt-3">
                    <input type="text" id="disabledTextInput" value={val} className="form-control" placeholder="Add Note" onChange={handleChange} />
                    <button type="submit" className="btn btn-success">{textBtn}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Formulaire
