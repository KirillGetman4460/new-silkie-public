import { useState } from 'react'
import CloseIcon from '../../svg/CloseModal'

interface Props{
    active?:any,
    addNewUser?:any,
    title?:any
}

const modalUserProfile = ({active,addNewUser,title}:Props) =>{

    const [value,setValue] = useState('')

    return (
        <dialog id="my_modal_2" className="modal  bg-overlay bg-opacity-10 p-0 " ref={active}>
        <div className="modal-box bg-white1 rounded-none">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><CloseIcon></CloseIcon></button>
            </form>
            <div className="modal__title font-semibold text-black-3 text-left">{title}</div>
            <label className="block">
                <input type="email" placeholder='почта' className="bg-gray-1 focus:outline-none  max-w-[300px] w-full"  value={value} onChange={e => setValue(e.target.value)}/>
            </label>
            <form method="dialog">
                <button 
                    className="modal__button__save bg-yellow-5 text-white1 font-semibold text-sm w-full"
                    onClick={() => addNewUser(value)}
                >Відправити запит</button>
            </form>
        </div>
        </dialog>
    )
}
export default modalUserProfile