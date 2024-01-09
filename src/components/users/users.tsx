// @ts-nocheck
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../../store/hooks/hooks.ts";
// import {selectTitle} from '../../store/breadcrumbs/breadcrumbsSlice.ts'
import {setConnectUsers} from '../../store/userData/userData.slice.ts'
import { IconButton, Typography } from "@material-tailwind/react";
import { useMediaQuery } from 'react-responsive'
import currentRole from '../../helper/currentRole.ts'
import Plus from '../../icons/bx_plus.svg'
// import EditIcon from '../../icons/ep_edit.svg'
import Arrow from '../../icons/ep_arrow-down.svg'
import Breadcrumbs from '../breadcrumb/breadcrumb.tsx'
import './users.scss'
import './usersMedia.scss'
import axios from "axios";
const Users = () =>{
    const [token] = useState(localStorage.getItem('token'))
    const [loading,setLoading] = useState(false)

    const id = useAppSelector(state => state.userData.id)

    const [active, setActive] = useState(1);
    const [current, setCurrent] = useState(1);
    const [perPage] = useState<number>(6);
    const [size] = useState<number>(perPage);

    const dispatch = useAppDispatch()

    const isIpadOne = useMediaQuery({
      query: '(max-width: 768px)'
    })

    const isIpad = useMediaQuery({
      query: '(max-width: 767px)'
    })
    const isMobileSmall = useMediaQuery({
      query: '(max-width: 576px)'
    })

    const [users,setUsers] = useState<any>([])

    const addSampleUser = () =>{
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          role: "Улога запису",
          firstName: "Ім'я користувача",
        },
      ]);
      
    }
    
    const getAllUsers = async() =>{   
    const res = await axios.get(`${process.env.REACT_APP_SERVER}profile/all`,{params:{userId:id},
      headers: {
          'Authorization': `Bearer ${token}`,
       }
      })    
      return res
    }
    
    const getData = (current:number, pageSize:number) => users.slice((current - 1) * pageSize, current * pageSize);
    const next = () => {
        if (active === Math.ceil(users.length / perPage)) return;
      
        const newPage = current + 1;
      
        if (newPage <= Math.ceil(users.length / perPage)) {
          setActive(newPage);
          setCurrent(newPage);
        }
      };
           
    const prev = () => {
        if (active === 1) return;
      
        const newPage = current - 1;
        if (newPage > 0) {
          setActive(newPage);
          setCurrent(newPage);
        }
    };
    
    useEffect(() =>{
        getAllUsers()
          .then(res => {
            if(res.data.code !== 200){
              setLoading(true)
              return
            }
            setUsers(res.data.users) 
            dispatch(setConnectUsers(res.data.users))            
            setLoading(false)         
          })
          .catch(err => console.log(err))
    },[])
    return (
        <div className="users bg-white1 w-full">
          {isIpadOne ? 
              <div className="header__title__page text-sx font-semibold flex items-center overflow-x-auto bg-gray-1">
                <Breadcrumbs/>
              </div>
            : ''}
            <div className="users__conteiner">
            {users.length >= perPage && 
                <div className="table__control flex items-center justify-end focus:outline-none">
<IconButton
  size="sm"
  variant="outlined"
  onClick={prev}
  className="border-none focus:outline-none focus:shadow-inherit"
>
 <img src={Arrow} alt="" />
</IconButton>
<Typography color="gray" className="font-normal">
<strong className="text-gray-900">{active}</strong> з{" "}
<strong className="text-gray-900">{Math.ceil(users.length / perPage)}</strong>
</Typography> 

<IconButton
  size="sm"
  variant="outlined"
  onClick={next}
  className="border-none outline-0 focus:outline-none"
>
  <img src={Arrow} alt="" className="rotate-180"/>
</IconButton>
            </div>}
              {!loading && 
                users.length && 
                 <div className="users__table border border-gray-2">
                 <div className="users__table__title bg-gray-2 border-b border-gray-2">
                   <div className="cell text-center text-black-3 font-bold text-sm">
                     Улога запису
                   </div>
                   <div className="cell text-center text-black-3 font-bold text-sm">
                     Ім'я користувача
                   </div>
                   <div className="cell text-center text-black-3 font-bold text-sm">
                     {
                       isIpad
                       ? (isMobileSmall ? 'CN' : 'Передплата CN')
                       : 'Передплата Chicken Nuggets'
                     } 
                   </div>
                   <div className="cell text-center text-black-3 font-bold text-sm">
                     {
                       isIpad
                       ? (isMobileSmall ? 'CG' : 'Передплата CG')
                       : 'Передплата Canja de Galinha'
                     }             
                   </div>
                 </div>
                 {users.map((item, i) => {
                     return <div className="users__table__row" key={i}>
                         <div className="cell ">
                             <span>{currentRole(item.role) || 'Улога запису'}</span>                        
                         </div>                          
                         <div className="cell">                     
                             {item.firstName}
                         </div>                      
                         <div className="cell item"> 
                         <div className="payment flex items-center justify-start ">
                            <div className={`active__icon  ${item.prepayment ? 'bg-yellow-5' : 'bg-black-1'}`}></div> 
                            {!isMobileSmall ? <div className="cell__text">{item.prepayment ? 'Активна' : 'Не активна'}</div> : ''}
                          </div>      
                        </div>                      
                        <div className="cell item text-left relative"> 
                          <div className="payment flex items-center justify-start w-auto">
                            <div className={`active__icon  ${item.prepayment ? ' bg-yellow-5' : 'bg-black-1 '}`}></div> 
                            {!isMobileSmall ?  <div className="cell__text">{item.prepayment ? 'Активна' : 'Не активна'}</div>: null}
                           
                          </div> 
                          <Link to={`/users/${item.userId || i}/profile`}>
                           <button className="btn__edit absolute top-3 right-0">
                           <div className="edit__icon">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M18.75 11.5C18.75 11.3342 18.8158 11.1753 18.9331 11.0581C19.0503 10.9408 19.2092 10.875 19.375 10.875C19.5408 10.875 19.6997 10.9408 19.8169 11.0581C19.9342 11.1753 20 11.3342 20 11.5V18.375C20 18.5408 19.9342 18.6997 19.8169 18.8169C19.6997 18.9342 19.5408 19 19.375 19H5.625C5.45924 19 5.30027 18.9342 5.18306 18.8169C5.06585 18.6997 5 18.5408 5 18.375V4.625C5 4.45924 5.06585 4.30027 5.18306 4.18306C5.30027 4.06585 5.45924 4 5.625 4H12.5C12.6658 4 12.8247 4.06585 12.9419 4.18306C13.0592 4.30027 13.125 4.45924 13.125 4.625C13.125 4.79076 13.0592 4.94973 12.9419 5.06694C12.8247 5.18415 12.6658 5.25 12.5 5.25H6.25V17.75H18.75V11.5Z" fill="#7E7E7E"/>
                               <path d="M8.33978 14.6589L9.3547 14.5137L15.5894 8.27992C15.6481 8.22318 15.695 8.1553 15.7272 8.08025C15.7594 8.0052 15.7764 7.92448 15.7771 7.84281C15.7778 7.76113 15.7623 7.68013 15.7313 7.60453C15.7004 7.52893 15.6547 7.46025 15.597 7.40249C15.5392 7.34474 15.4705 7.29906 15.395 7.26813C15.3194 7.2372 15.2384 7.22164 15.1567 7.22235C15.075 7.22306 14.9943 7.24003 14.9193 7.27226C14.8442 7.3045 14.7763 7.35137 14.7196 7.41012L8.48372 13.6439L8.33855 14.6589H8.33978ZM16.4591 6.53908C16.6306 6.71046 16.7666 6.91395 16.8594 7.13792C16.9522 7.3619 17 7.60196 17 7.8444C17 8.08685 16.9522 8.32691 16.8594 8.55089C16.7666 8.77486 16.6306 8.97835 16.4591 9.14973L10.0805 15.5287C9.98646 15.6231 9.86428 15.6844 9.73237 15.7034L7.70254 15.9938C7.60794 16.0073 7.51148 15.9987 7.42081 15.9685C7.33013 15.9383 7.24774 15.8874 7.18016 15.8198C7.11258 15.7522 7.06168 15.6699 7.03149 15.5792C7.00131 15.4885 6.99266 15.392 7.00625 15.2974L7.29657 13.2675C7.31521 13.1357 7.37608 13.0135 7.47003 12.9193L13.8499 6.54031C14.1959 6.19435 14.6652 6 15.1545 6C15.6438 6 16.1131 6.19435 16.4591 6.54031V6.53908Z" fill="#7E7E7E"/>
                             </svg>
                           </div>
                           </button> 
                          </Link>
                        </div> 
                       
                     </div>
                 })}                  
             </div>
              }
               
               <button className="add__new__users text-sm font-normal flex items-center"
                onClick={() => addSampleUser()}
               >
                    <img src={Plus} alt="" />
                    <span>Додати нового користувача</span> 
               </button>
            </div>
        </div>
    )
}
export default Users