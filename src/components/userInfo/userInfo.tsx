import axios from 'axios'
import {useState,useEffect} from 'react'
import { Link,Outlet,NavLink,useLocation,useParams } from "react-router-dom";
import Breadcrumbs from '../breadcrumb/breadcrumb.tsx'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next';
import Arrow from '../../icons/ep_arrow-down.svg'
import './userInfo.scss'
import './userInfoMedia.scss'
const userInfo = () =>{

    const { t } = useTranslation();

    const {pathname} = useLocation()

    const {userId} = useParams();

    const [token] = useState(localStorage.getItem('token'))

    const [userAuth,setUserAuth] = useState(false)

    // const [userRole,setUserRole] = useState('')

    const getData = async() =>{
        const res = await axios.get(`${process.env.REACT_APP_SERVER}profile/one`,{params:{userId:userId},
            headers: {
                'Authorization': `Bearer ${token}`,
             } 
        })
        return res
    }

    const isIpad = useMediaQuery({
        query: '(max-width: 768px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 575px)'
    }) 

    useEffect(() =>{
        getData()
            .then(res => {
                if(res.data.code === 403) return setUserAuth(false)
                setUserAuth(true)
                // setUserRole(res.data.profile.role)
            })
    },[])

    // const deleteUser = async() =>{
    //     await axios.delete(`${process.env.REACT_APP_SERVER}profile/delete?userId=${userId}`,
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //             } 
    //         }
    //     )
    //     .then(res => console.log(res))  
    //     .catch(err => console.log(err))
    // }

    return(
        <div className="user__info w-full">
            {isIpad && <div className="header__title__page text-sx font-semibold flex items-center overflow-x-auto bg-gray-1"><Breadcrumbs/></div>}
            <div className="back flex justify-end">
                    <img src={Arrow} alt="" />
                    <Link to='/users'>{t('usersInfo.back_btn')}</Link>
                </div>
            <div className="user__info__conteiner ">      
                <div className="user__info__tabs flex border-b border-gray-2 bg-white1">
                    <NavLink to={`/users/${userId}/profile`}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <div className="info__tabs__title text-black-3 font-semibold text-sm uppercase">
                            {!isMobile ? t('usersInfo.personal_data') : " Особисті дані"}
                        </div>
                    </NavLink>   
                    {userAuth && 
                        <NavLink to={`/users/${userId}/notification`}>
                        <div className="info__tabs__title text-black-3 font-semibold text-sm uppercase">
                        {t('usersInfo.notification')}
                        </div>      
                    </NavLink> 
                    }
                     {userAuth && 
<NavLink to={`/users/${userId}/subscriptions`}>
    <div className="info__tabs__title text-black-3 font-semibold text-sm uppercase">
    {t('usersInfo.subscriptions')}
    </div>
 </NavLink>  
} 
                     
                         
                </div>
                <Outlet/>          
            </div>
            {pathname === `/users/${userId}/profile` ? <div className="user__delete flex items-center justify-between bg-white1">
                    <div className="user__delete__text__content">
                        <div className="user__delete__title text-lg font-semibold text-black-3">Небезпечна зона</div>
                        <div className="user__delete__text text-sm text-black-3 font-normal">Після видалення облікового запису користувача цю дію неможливо відновити. </div>
                    </div>
                    <button className="user__delete__button text-sm font-semibold text-black-2">
                        Видалити 
                    </button>
            </div> : null}
    
        </div>
    )
}
export default userInfo