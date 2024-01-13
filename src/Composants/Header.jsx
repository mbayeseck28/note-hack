import { useTodoContext } from "../providers/TodoProvider"

// Composant changeur couleur background
const Bgcolor = ({color, changebg}) => {
    return (
        <button className={`btn btn-bg rounded-circle border-0 ${color}`} onClick={changebg}></button>
    )
  }


const Header = () => {
  const {changebg} = useTodoContext();

  return (
    <div className="card shadow">
        <div className="card-body d-flex justify-content-between flex-wrap">
            <h4 className="card-title">
                Note Hack
            </h4>
            <div className='d-flex gap-2 flex-wrap align-items-center'>
                <Bgcolor color="gradientOne" changebg={() => changebg("gradientOne")} />
                <Bgcolor color="gradientTwo" changebg={() => changebg("gradientTwo")} />
                <Bgcolor color="gradientThree" changebg={() => changebg("gradientThree")} />
                <Bgcolor color="gradientFour" changebg={() => changebg("gradientFour")} />
                <Bgcolor color="gradientFive" changebg={() => changebg("gradientFive")} />
                <Bgcolor color="gradientSix" changebg={() => changebg("gradientSix")} />
            </div>
        </div>
    </div>
  )
}

export default Header
