import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
// import { ErrorMessage } from "@hookform/error-message";
import CustomInput from '../../ui/input/input'
import Button from '../../ui/button/button'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import CloseIcon from '../svg/CloseModal'

import './style/modalAuth.scss'
interface PropsModal{
    active?: any,
}

type FormValues = {
    email: string,
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
 })
const resetPassword = ({active}:PropsModal) =>{
    const { register, handleSubmit } = useForm<FormValues>(
        {resolver: yupResolver(schema)}
    )

    const resetPassword = async(email:any) =>{
        const res = axios.get(`${process.env.REACT_APP_SERVER}/forgot/email`,email)
        return res
    }
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if(data){
            resetPassword(data.email)
                .then(res => {
                    console.log(res)
                    active.current?.classList.remove('modal-open')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <dialog id="my_modal_5" className="modal  bg-overlay bg-opacity-10 p-0 " ref={active}>
        <div className="modal-box bg-white1 rounded-none pb-0">
            <form method="dialog">
                <button onClick={() => active.current?.classList.remove('modal-open')} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><CloseIcon></CloseIcon></button>
            </form>
            <div className="modal__title font-semibold text-black-3 text-center">Відновлення паролю</div>

            <form className="auth__form flex flex-col gap-3">
                <CustomInput placeholder="Введіть email" register={register("email")} type={'email'}/>
                {/* <ErrorMessage 
                    errors={errors} 
                    name="email" 
                    as="p" 
                    render={() => <p className="input__error text-red text-xs font-normal w-full">Невірно введена електронна адреса або пароль</p>}
                /> */}
            </form>
            <form method="dialog" className="pb-10">
                <Button onSubmit={handleSubmit(onSubmit)} type={"submit"} bg={'bg-yellow-3'}>Відновити</Button>
            </form>
        </div>
        </dialog>
    )
}
export default resetPassword