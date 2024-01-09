// @ts-nocheck
import axios from 'axios'
import Plus from '../../icons/bx_plus.svg'
import { useEffect, useState,useRef } from "react"
import { useMediaQuery } from 'react-responsive'
import { useAppSelector,useAppDispatch } from "../../store/hooks/hooks.ts"

import { useTranslation } from 'react-i18next';

import {setConnectUsers} from '../../store/userData/userData.slice.ts'
import { NavLink } from "react-router-dom";
import OrderAccordion from './orderAccordion'
import Trash from '../../icons/carbon_trash-can.svg'
// import Plus from '../../icons/bx_plus.svg'
import EditIcon from '../../icons/ep_edit.svg'
import Breadcrumbs from '../breadcrumb/breadcrumb.tsx'
import './orders.scss'
import './ordersMedia.scss'
const Orders = () =>{

    const { t } = useTranslation();

    const [selectedItem, setSelectedItem] = useState(null);
    const [token] = useState(localStorage.getItem('token'))
    const formRef = useRef(null);

    const [basket,setBasket] = useState([])
    const [price, setPrice] = useState(null)
    const [total, setTotal] = useState<number>()
    const [usersName,setUsersName] = useState<string[]>([])
    const [userId,setUserId] = useState<any>('')
    const [orderId,setOrderId] = useState()

    const isIpad = useMediaQuery({
        query: '(max-width: 768px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 679px)'
    })
    const isMobileSmallOne = useMediaQuery({
        query: '(max-width: 575px)'
    })
    const isMobileSmall = useMediaQuery({
        query: '(max-width: 465px)'
    })

    const dispatch = useAppDispatch()

    const [users,setUsers] = useState<any>([])
    const {id,connectUsers} = useAppSelector(state => state.userData)

    const getBasket = async() =>{
        const res = await axios.get(`${process.env.REACT_APP_SERVER}basket/one?userId=${id}`,
           {
            headers: {
                'Authorization': `Bearer ${token}`,
             } 
           }
        )
        return res.data.data
    }
    // const getUsers = async() =>{
    //     const listDataUsers = await Promise.all(basket.map(async item => {
    //       const user = await axios(`${process.env.REACT_APP_SERVER}profile/one?userId=${item.userId}`,{
    //         headers: {
    //           'Authorization': `Bearer ${token}`,
    //       } 
    //       })
    //       if(user.data.code === 200){
    //         return 
    //       }
    //       return user.data
    //     }))
    //     listDataUsers.filter(item => item)
    // }
    const paymentCreate =  async() =>{
        const res = await axios.get(`${process.env.REACT_APP_SERVER}payment/create?userId=${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                } 
            }
        )  
        setOrderId(res.data.data.orderId)
    } 

    const clearBusket = async(busketId:string) =>{
        const updatedBasket = basket.filter(item => item.userId !== busketId);
        setBasket(updatedBasket);
        
        try {
          await axios.post(
            `${process.env.REACT_APP_SERVER}basket/update`,
            {
              userId: id,
              basket: basket.filter(item => item.userId !== busketId)
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );  
             
        } catch (error) {
          console.log(error);      
        }
      }

    const handleClick = (index: any) => {
        setSelectedItem((prevSelectedItem) => {
          const isSelected = prevSelectedItem === index;
          return isSelected ? null : index;
        });
    };

    const getAllUsers = async() =>{   
        const res = await axios.get(`${process.env.REACT_APP_SERVER}profile/all`,{params:{userId:id},
          headers: {
              'Authorization': `Bearer ${token}`,
           }
          })    
          return res
    }

    useEffect(() =>{       
            getAllUsers()
                .then(res => {
                    setUsers(res.data.users) 
                    dispatch(setConnectUsers(res.data.users))          
                })
                .catch(err => console.log(err))

            getBasket()
                .then((res) => {
                    setBasket(res.basket)
                    setPrice(res.basket[0].price);
                    const totalPrice = res.basket.reduce((acc, item) => acc + parseInt(item.price), 0)
                    setTotal(totalPrice)
                    setUserId(res.basket[0].userId)
                })
                .catch(err => console.log(err))
    },[])

    useEffect(() =>{
    getBasket()
        .then((res) => {        
            const totalPrice = res.basket.reduce((acc, item) => acc + parseInt(item.price), 0)
            setTotal(totalPrice)
        })
        .catch(err => console.log(err))
    },[basket])

    useEffect(() =>{
        const form = formRef.current;
    
        const submitForm = () => {
          if (form) {
            form.submit();
          }
        };
        if(orderId){
            submitForm()
            console.log(123);
            
            return
        }  
    },[orderId])

    if(!basket.length){
        return <div className='orders w-full'>
            {isIpad ? 
              <div className="header__title__page text-sx font-semibold flex items-center overflow-x-auto bg-gray-1">
                <Breadcrumbs/>
              </div>
            : ''}
            <div className="orders__conteiner bg-white1">
                <NavLink to={'/users'}>
                <button className="add__new__users text-sm font-normal flex items-center">
                        <img src={Plus} alt="" />
                        <span>{t('basket.basket_btn')}</span> 
                </button>
                </NavLink>
                
            </div>
        </div>
    }
    
    return (
        <div className="orders w-full">
            {isIpad ? 
              <div className="header__title__page text-sx font-semibold flex items-center overflow-x-auto bg-gray-1">
                <Breadcrumbs/>
              </div>
            : ''}
            {basket.length && 
                    <div className="orders__conteiner bg-white1">
                
                    <div className="orders__table border border-gray-2">      
                         <div className="orders__title  bg-gray-2 border-b border-gray-2 flex items-center w-full">
                         <div className="cell text-center text-black-3 font-bold md:text-sm text-xs">{t('basket.user_name')}</div>
                         <div className="cell text-center text-black-3 font-bold md:text-sm text-xs">
                         {
                             isMobile
                             ? (isMobileSmall ? 'CN' : 'Передплата CN')
                             : t('basket.chicken_nuggets_subscription')
                         }  
                         </div>
                         <div className="cell text-center text-black-3 font-bold md:text-sm text-xs">
                         {
                             isMobile
                             ? (isMobileSmall ? 'GN' : 'Передплата GN')
                             : t('basket.canja_de_galinha_subscription')
                         }  
                         </div>
                         <div className="cell text-center text-black-3 font-bold md:text-sm text-xs">{t('basket.to_be_paid')}</div>
                     </div>         
                        {basket.map((item,i) => 
                        <>
                            <div className={`orders__row flex relative  ${selectedItem === i ? 'selected hover:outline-none' : ''}`} key={i} onClick={() => handleClick(i)}>
                                <div className="cell text-center md:text-sm text-xs uppercase">{users.find(user => user.userId === item.userId)?.firstName}</div>
                                <div className="cell text-center ">
                                    <div className="cell__content flex justify-center">
                                        <div className="payment__text md:text-sm text-xs">{item.chickenNuggetsDates.length}</div>
                                        <NavLink to={`/users/${item.userId}/subscriptions/chicken-nuggets`}>
                                            <button className="payment__edit__btn"><img src={EditIcon} alt="" /></button>  
                                        </NavLink> 
                                    </div>                      
                                </div>
                                <div className="cell text-center">
                                    <div className="cell__content flex justify-center">
                                        <div className="payment__text md:text-sm text-xs">0</div>
                                        <button className="payment__edit__btn"><img src={EditIcon} alt="" /></button>
                                    </div>                                  
                                </div>
                                <div className="cell text-center ">
                                    <div className="money__text md:text-sm text-xs">
                                        {item.price} USD
                                    </div>
                                </div>
                                <button className="money__button absolute" onClick={() => clearBusket(item.userId)}><img src={Trash} alt="" /></button>    
                                {isMobileSmallOne ? <div className={`btn__arrow absolute ${selectedItem === i ? 'rotate-180' : ''}`}>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122"/>
                                    </svg>
                                </div> : null}   
                            </div>  
                            {isMobileSmallOne ?  <OrderAccordion item={item} index={i} clearBusket={clearBusket} selectedItem={selectedItem} handleClick={handleClick}/> : null}                    
                        </>           
                        )}
                        
                    </div>
                    <NavLink to={'/users'}>
                <button className="add__new__users text-sm font-normal flex items-center">
                        <img src={Plus} alt="" />
                        <span>{t('basket.basket_btn')}</span> 
                </button>
                </NavLink>
                     <form ref={formRef} method="post" action="https://wallet.advcash.com/sci/" className='form__advcash'>
                <input type="hidden" name="ac_account_email" value="kirill.demchenko.69@gmail.com" className='input__hidden' />
            <input type="hidden" name="ac_sci_name" value="silkie" className='input__hidden' />
            <input type="text" name="ac_amount" value={total} className='input__hidden' />
            <input type="text" name="ac_currency" value="USD" className='input__hidden' />
            <input type="text" name="ac_order_id" value="123456789" className='input__hidden' />
            <input type="text" name="ac_sign" value="c6edb505e6cb722ebbe9f970097f7d1cf6baa6f5e3b13fad888031eb78ace8ab" className='input__hidden' />
            <input type="hidden" name="ac_success_url" value={`http://localhost:3000/payment/accept?orderId=${orderId}`} className='input__hidden'  />
            <input type="hidden" name="ac_success_url_method" value="GET" className='input__hidden' />

            <input type="hidden" name="ac_fail_url" value={`http://localhost:3000/payment/cancel?orderId=${orderId}`} className='input__hidden' />
            <input type="hidden" name="ac_fail_url_method" value="GET" className='input__hidden' />

            <input type="hidden" name="ac_status_url" value="https://new-silkie.vercel.app" className='input__hidden' />
            <input type="hidden" name="ac_status_url_method" value="GET" className='input__hidden' />

            <input type="text" name="ac_comments" value="Comment" className='input__hidden' />
            
            
            </form>
            <button className="pay flex" onClick={() => paymentCreate()} type="submit"><span className="text-white1 bg-yellow-5 text-normal font-medium">{t('basket.to_pay')} {total} $</span></button>
            </div>
            }
            
           
        </div>
    )   
}
export default Orders