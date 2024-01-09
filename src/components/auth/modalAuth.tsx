// @ts-nocheck
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
// import { ErrorMessage } from "@hookform/error-message";
import {useAppDispatch} from '../../store/hooks/hooks'
// import {setToken} from '../../store/auth/authenticated'
import {setId,setRole} from '../../store/userData/userData.slice.ts'
import {setAuthenticated} from '../../store/auth/authenticated.ts'
import CustomInput from '../../ui/input/input'
import Button from '../../ui/button/button'
import Checkbox from "../../ui/checkbox"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import CloseIcon from '../svg/CloseModal'

import './style/modalAuth.scss'

interface PropsModal{
    active?: any,
    handleShowRegister?:any,
    handleShowReset?:any
}

type FormValues = {
    email: string,
    password:string,
}

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
 })

const modalAuth = ({active,handleShowRegister,handleShowReset}:PropsModal) =>{

    const dispatch = useAppDispatch() 

    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [messError,setMessError] = useState<boolean>(false)
    
    const { register, handleSubmit } = useForm<FormValues>(
        {resolver: yupResolver(schema)}
    )

    const login = async(data:any) => {     
        const res = axios.post(`${process.env.REACT_APP_SERVER}auth/login`,data)
        return res
    }
    const verifyUser = async() => {
        const res = axios.post(`${process.env.REACT_APP_SERVER}auth/verify`,{},{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return res
    }

     const onSubmit: SubmitHandler<FormValues> = async(data) => {         
        if(data){
            await login(data)
                .then(res => {
                    if(res.data.code === 404){
                        setMessError(true)
                        return
                    }
                    setMessError(false)
                    
                    dispatch(setRole(res.data.role))
                    dispatch(setId(res.data.id)) 
                    dispatch(setAuthenticated(true))
                    
                    localStorage.setItem("token", res.data.token)                
                    active.current?.classList.remove('modal-open')  
                    window.location.reload(false);          
                })
                .catch(err => console.log(err))   
                
            await verifyUser()
                    .then(({data}) => {
                        dispatch(setRole(data.data.role.replace(/'/g, '')))
                        dispatch(setId(data.data.id))
                    })
                    .catch(err => console.log(err)) 
        }
    }

    
    return(
        <dialog id="my_modal_4" className={`modal  bg-overlay bg-opacity-10 p-0`} ref={active}>
        <div className="modal-box bg-white1 rounded-none pb-0">
            <form method="dialog">
                <button onClick={() => active.current?.classList.remove('modal-open')} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><CloseIcon></CloseIcon></button>
            </form>
            <div className="modal__title font-semibold text-black-3 text-center">Авторизуватись</div>

            <form className="auth__form flex flex-col gap-3">
                <CustomInput placeholder="Почта" register={register("email")} type={'email'} value={email} onChange={setEmail} mess={messError}>
                    {messError && <p className="input__error text-red text-xs font-normal w-full">Невірно введена електронна адреса або пароль</p>}
                </CustomInput>
                <CustomInput placeholder="Пароль" value={password} onChange={setPassword} register={register("password")} type={"text"} show={true}> 
                    {messError && <p className="input__error text-red text-xs font-normal w-full">Невірно введена електронна адреса або пароль</p>}
                </CustomInput>
            </form>

            <div className="form__content pt-8 flex w-full items-center justify-between">
                <div className="remember__password flex items-center">
                    <Checkbox></Checkbox>
                    <span className="pl-2 text-xs font-semibold text-black-3">Запам’ятати пароль</span>
                </div>
                <div className="change__password text-black-2 text-xs cursor-pointer" onClick={() => {
                        active.current?.classList.remove('modal-open')
                        handleShowReset()
                    }}
                >
                        Відновити пароль
                </div>     
            </div>
            <Button onSubmit={handleSubmit(onSubmit)} type={"submit"} bg={'bg-yellow-3'}>Увійти</Button>
            <form method="dialog">
                <button onClick={() => {
                    active.current?.classList.remove('modal-open')
                    handleShowRegister()
                }} 
                className="register__btn text-yellow-5 text-normal font-semibold w-full text-center pt-8 pb-10">
                    Зареєструватися
                </button>
            </form>
        </div>
        </dialog>
    )
}
export default modalAuth