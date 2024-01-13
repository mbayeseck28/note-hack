import { useTodoContext } from "../providers/TodoProvider"

const Formulaire = () => {

  const {entree, setEntree, textbtn, addOrUpdate} = useTodoContext();
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!entree) {
        return;
    }
    addOrUpdate()
    setEntree("")
}
  
  return (
    <div className='bg-white rounded my-5 card shadow'>
        <div className='card-body'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex justify-content-between w-100 gap-2 mt-3">
                    <input type="text" id="disabledTextInput" value={entree} className="form-control" placeholder="Add Note" onChange={(e) => setEntree(e.target.value)} />
                    <button type="submit" className="btn btn-success">{textbtn}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Formulaire
