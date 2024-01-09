// @ts-nocheck
import axios from 'axios'
import { useState, useRef,useCallback,useEffect } from 'react'
import {useAppSelector} from '../../../store/hooks/hooks'
import { useParams  } from "react-router-dom";
// import DropDownSelect from "../../../ui/dropDownSelect.tsx";
import Modal from './modalUserProfile.tsx'
import ModalChangePassword from './modalChangePassword.tsx'
import CopyIcon from '../../../icons/octicon_copy-24.svg'
import EditIcon from '../../../icons/ep_edit.svg'

import "./userProfile.scss"
const UserProfile = () =>{
    const [token] = useState(localStorage.getItem('token'))
    const {userId} = useParams();
    const id = useAppSelector(state => state.userData.id) 

    const [userAuth,setUserAuth] = useState(false)
    
    const [passwordProfile,setPasswordProfile] = useState('')
    const [emailProfile,setEmailProfile] = useState('')
    const [nameProfile,setNameProfile] = useState('')
    const [phoneProfile,setPhoneProfile] = useState('')
    const [idUser, setIdUser] = useState('')
    // const [roleProfile,setRoleProfile] = useState('')

    const ref = useRef<HTMLDialogElement>(null);
    const refEmail = useRef<HTMLDialogElement>(null);
    const refPassword = useRef<HTMLDialogElement>(null);
    const refPhone = useRef<HTMLDialogElement>(null);

    // const [roleOption] = useState<any>(['Власник','Користувач','Щитач','Привідець'])
    const [roleSelect,setRoleSelect] = useState<any>("Користувач")

    const CopyID = (id:any) => navigator.clipboard.writeText(id)

    const handleShow = useCallback(() => ref.current?.showModal(), [ref]);
    const handleEmailShow = useCallback(() => refEmail.current?.showModal(), [refEmail]);
    const handlePasswordShow = useCallback(() => refPassword.current?.showModal(), [refPassword]);
    const handlePhoneShow = useCallback(() => refPhone.current?.showModal(), [refPhone]);

    // const selectOptionRole = (lang:string) => setRoleSelect(lang)

    // const currentRole = (role: string): string | null =>{
    //     switch (role) {
    //         case 'Користувач':
    //           return 'user';
    //         case 'Власник':
    //             return 'super_admin';
    //         default:
    //           return null;
    //     }
    // }

    const changeEmail = async(email:string) =>{
        await axios.put(`${process.env.REACT_APP_SERVER}profile/email`,{   
            userId: userId,
            newEmail: email
        },{headers: {'Authorization': `Bearer ${token}`,}})
    }

    const changePassword = async(newPassword:string) =>{
        await axios.put(`${process.env.REACT_APP_SERVER}profile/password`,{   
            userId: userId,
            newPassword: newPassword
        },{headers: {'Authorization': `Bearer ${token}`,}})
    }

    const changePhone = async(newPhone:string) =>{
        await axios.put(`${process.env.REACT_APP_SERVER}profile/phone`,{   
            userId: userId,
            newPassword: newPhone
        },{headers: {'Authorization': `Bearer ${token}`,}})
    }

    const getData = async() =>{
        const res = await axios.get(`${process.env.REACT_APP_SERVER}profile/one`,{params:{userId:userId},
            headers: {
                'Authorization': `Bearer ${token}`,
             } 
        })
        return res
    }

    const addNewUser = async() =>{ 
        const res = await axios.post(`${process.env.REACT_APP_SERVER}profile/create`,{
          userId: id,
          role: "user",
          firstName: nameProfile,
          lastName: nameProfile,
          phone: phoneProfile,
          email: emailProfile,
          password: passwordProfile
        },{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        console.log(res);
        
      }

    useEffect(() =>{
        getData()
            .then(res => {
                if(res.data.code === 403) return setUserAuth(false)
                setUserAuth(true)
                setEmailProfile(res.data.profile.email)
                setNameProfile(res.data.profile.firstName)
                setPhoneProfile(res.data.profile.phone)
                setIdUser(res.data.profile.userId)
                // setRoleSelect(res.data.profile.role || 'Користувач')
            })
            .catch(err => console.log(err))       
    },[])
    return (
        <div className="user__profile bg-white1">
            <div className="user__info__content ">
                    <div className="user__personal__data flex items-center">
                        <div className="personal__data__left max-w-[332px] w-full">    
                                <label className="block relative">
                                    <span className="block text-black-2 text-sm font-normal">Унікальний ID</span>
                                    <div className="input__content flex items-center ">
                                        <input type="text" className="bg-gray-1 focus:outline-none max-w-[300px] w-full border-none" disabled  value={idUser}/> 
                                        <button className="copy__id flex justify-start" onClick={() => CopyID(idUser)}><img src={CopyIcon} alt="" /></button>   
                                    </div>
                                                         
                                </label>
                                <label className="block">
                                    <span className="block text-black-2 text-sm font-normal">Улога запису</span>
                                    <input type="email" className="bg-gray-1 focus:outline-none  max-w-[300px] w-full border-none" disabled onChange={e => setRoleSelect(e.target.value)} value={roleSelect}/>
                                </label>
                                {/* <DropDownSelect 
                                    title={'Улога запису'}  
                                    option={roleOption} 
                                    select={selectOptionRole} 
                                    langSelect={roleSelect}         
                                /> */}
                            <label className="block">
                                <span className="block text-black-2 text-sm font-normal">Ім’я користувача</span>
                                <input type="email" className="bg-gray-1 focus:outline-none  max-w-[300px] w-full border-none" placeholder='Ім’я користувача' disabled={userAuth} onChange={e => setNameProfile(e.target.value)} value={nameProfile || ''}/>
                            </label>
                        </div>
                        <div className="personal__data__right w-full">
                        <label className="block relative">
                                <span className="block text-black-2 text-sm font-normal">Email</span>
                                <div className="input__content flex items-center">
                                    <input type="email" className="bg-gray-1 focus:outline-none max-w-[300px]  w-full border-none"  placeholder='Почта' onChange={e => setEmailProfile(e.target.value)} value={emailProfile || ''}/>
                                    <button className="copy__id flex justify-start" onClick={() => handleEmailShow()}><img src={EditIcon} alt="" /></button> 
                                </div>
                            </label>
                            <label className="block relative">
                                <span className="block text-black-2 text-sm font-normal">Телефон</span>
                                <div className="input__content flex items-center">
                                    <input type="email" className="bg-gray-1 focus:outline-none max-w-[300px] w-full border-none"  placeholder='Телефон' onChange={e => setPhoneProfile(e.target.value)} value={phoneProfile || ''}/>
                                    <button className="copy__id flex justify-start" onClick={() => handlePhoneShow()}><img src={EditIcon} alt="" /></button> 
                                </div>
                            </label>
                            <label className="block relative">
                                <span className="block text-black-2 text-sm font-normal">Пароль</span>
                                <div className="input__content flex items-center">
                                    <input type="password" className="bg-gray-1 focus:outline-none max-w-[300px] w-full border-none" placeholder='Пароль' onChange={e => setPasswordProfile(e.target.value)} value={passwordProfile}/>
                                    <button className="copy__id flex justify-start" onClick={() => handlePasswordShow()}><img src={EditIcon} alt="" /></button> 
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="profile__invite flex items-center justify-between">
                        <div className="profile__invite__text text-black-2 text-sm font-normal">Використовуйте вказані дані щоб увійти у свій обліковий запис  та отримувати сповіщення.</div>
                        <button className="profile__invite__button" onClick={() => handleShow()}>
                            <span className='border border-black-2 text-sm font-semibold text-black-3 uppercase'>Запросити</span>
                        </button>
                    </div>
                    <Modal active={ref} addNewUser={addNewUser} title={'Запросити'}></Modal>
                    <Modal active={refEmail} addNewUser={changeEmail} title={'Зміна електронної почти'}></Modal>
                    <Modal active={refPhone} addNewUser={changePhone} title={'Зміна телефону'}></Modal>
                    <ModalChangePassword active={refPassword} addNewUser={changePassword} title={'Зміна паролю'}></ModalChangePassword>
                </div>
        </div>
    )
}
export default UserProfile