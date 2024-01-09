import axios from 'axios'
import { useState } from 'react'
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
    handleShowAuth?:any,
}

type FormValues = {
    name:string,
    lastname:string,
    email: string,
    password:string,
    cpassword:string
}

const schema = yup.object().shape({
    name:yup.string().required(),
    lastname:yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    cpassword: yup.string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match")
})
const register = ({active,handleShowAuth}:PropsModal) => {

    const[firstName,setFirstName] = useState('')
    const[lastName,setLastName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    // const [mess,setMess] = useState('')

    // const [messError,setMessError] = useState<boolean>(false)

    const { register, handleSubmit } = useForm<FormValues>(
        {resolver: yupResolver(schema)}
    )
    // const password = useRef({});
    // password.current = watch("password", "");

    const registerUser = async(data:any) =>{
        const res = axios.post(`${process.env.REACT_APP_SERVER}auth/register`,data)
        return res
    }
    
    const onSubmit: SubmitHandler<FormValues> = (data) => {   
        if(data){
            registerUser({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
                .then(res => {
                    if(res.data.code === 404){
                        // setMessError(true)
                        return
                    }
                    
                    // setMessError(false) 
                    active.current?.classList.remove('modal-open')               
                })
                .catch(err => console.log(err))  
        }
    }
    
   
    return (
        <dialog id="my_modal_1" className="modal  bg-overlay bg-opacity-10 p-0 " ref={active}>
        <div className="modal-box bg-white1 rounded-none pb-0">
            <form method="dialog">
                <button onClick={() => active.current?.classList.remove('modal-open')} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><CloseIcon></CloseIcon></button>
            </form>
            <div className="modal__title font-semibold text-black-3 text-center">Зареєструватись</div>

            <form className="auth__form flex flex-col gap-3">
                <CustomInput placeholder="Введіть прізвище" register={register("lastname")} type={'text'} value={firstName} onChange={setFirstName}/>
                {/* <ErrorMessage 
                    errors={errors} 
                    name="email" 
                    as="p" 
                    render={() => <p className="input__error text-red text-xs font-normal w-full">Невірно введена електронна адреса або пароль</p>}
                /> */}

                <CustomInput placeholder="Введіть ім’я" register={register("name")} type={'text'} value={lastName} onChange={setLastName}/>
                
                {/* <ErrorMessage 
                    errors={errors} 
                    name="password" 
                    as="p" 
                    render={() => <p className="input__error text-red text-xs font-normal w-full">Невірно введена електронна адреса або пароль</p>}
                /> */}
                <CustomInput placeholder="Введіть email" register={register("email")} type={'text'} value={email} onChange={setEmail}>
                    {/* {mess && <p className="input__error text-red text-xs font-normal w-full">Невірно введена електронна адреса або пароль</p>} */}
                </CustomInput>


                <CustomInput placeholder="Пароль" register={register("password")} type={"text"} show={true} value={password} onChange={setPassword}/> 

                <CustomInput placeholder="Повторіть пароль" register={register("cpassword")} type={"text"} show={true}/> 
            </form>
            <Button onSubmit={handleSubmit(onSubmit)} type={"submit"} bg={'bg-yellow-3'}>Зареєструватись</Button>
            <form method="dialog">
                <button onClick={() => {
                    handleShowAuth()
                    active.current?.classList.remove('modal-open')

                }} className="register__btn text-yellow-5 text-normal font-semibold w-full text-center pt-8 pb-10">
                    У мене вже є обліковий запис
                </button>
            </form>
        </div>
        </dialog>
    )
}
export default register