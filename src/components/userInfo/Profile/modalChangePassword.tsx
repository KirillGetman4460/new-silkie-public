import { useState } from 'react'
import CustomInput from '../../../ui/input/input'
import CloseIcon from '../../svg/CloseModal'

interface Props{
    active?:any,
    addNewUser?:any,
    title?:any
}

const modalChangePassword = ({active,addNewUser,title}:Props) =>{

    const [tempPassword,setTempPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [repeatPassword,setRepeatPassword] = useState('')

    return (
        <dialog id="my_modal_2" className="modal  bg-overlay bg-opacity-10 p-0 " ref={active}>
        <div className="modal-box bg-white1 rounded-none">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><CloseIcon></CloseIcon></button>
            </form>
            <div className="modal__title font-semibold text-black-3 text-left">{title}</div>
                <div className="input__title text-xs text-black-2">Поточний або тимчасовий пароль</div>
                <CustomInput type={"text"} show={true} value={tempPassword} onChange={setTempPassword}/>

                <div className="input__title text-xs text-black-2 pt-3">Новий пароль</div>
                <CustomInput type={"text"} show={true} value={newPassword} onChange={setNewPassword}/>

                <div className="input__title text-xs text-black-2 pt-3">Новий пароль ще раз</div>
                <CustomInput type={"text"} show={true} value={repeatPassword} onChange={setRepeatPassword}/>

            <form method="dialog">
                <button 
                    className="modal__button__save bg-yellow-5 text-white1 font-semibold text-sm w-full"
                    onClick={() => addNewUser(newPassword)}
                >Відправити запит</button>
            </form>
        </div>
        </dialog>
    )
}
export default modalChangePassword