// @ts-nocheck
import axios from "axios";
import {useEffect, useState} from "react";
// import { IconButton, Typography } from "@material-tailwind/react";
import {useAppDispatch} from '../../store/hooks/hooks'
import {useAppSelector} from '../../store/hooks/hooks.ts'
import CreateUsers from '../createUsers/createUsers.tsx'

import { useTranslation } from 'react-i18next';

// import {selectTitle} from '../../store/header/headerSlice'
import { useMediaQuery } from 'react-responsive'
// import TableItem from "./tableItem";
// import Arrow from '../../icons/ep_arrow-down.svg'

import './helpPanel.scss'
import './helpPanelMedia.scss'
const HelpPanel = () =>{
    // const [active, setActive] = useState(1);
    // const [current, setCurrent] = useState(1);

    const { t } = useTranslation();
    const [token] = useState(localStorage.getItem('token'))

    const [loading,setLoading] = useState(true)

    const [users,setUsers] = useState<any>([])

    const [userId,setUserId] = useState('')

    const id = useAppSelector(state => state.userData.id)
    
    const dispatch = useAppDispatch() 

    const isMobile = useMediaQuery({
      query: '(max-width: 768px)'
    })
    const isMobileIpad = useMediaQuery({
      query: '(max-width: 767px)'
    })
    const isMobileSmall = useMediaQuery({
      query: '(max-width: 465px)'
    })
  
    // const [selectedItem, setSelectedItem] = useState(null);
    const {title} = useAppSelector(state => state.header)

    const verifyUser = async() => {
      const res = axios.post(`${process.env.REACT_APP_SERVER}auth/verify`,{},{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
      })
        return res
    }

    const getAllUsers = async(test) =>{
      const res = await axios.get(`${process.env.REACT_APP_SERVER}profile/all`,{params:{userId:test || id},
      headers: {
          'Authorization': `Bearer ${token}`,
       }
      })    
      return res.data
    }
    
    // const handleClick = (index: any, title: string) => {
    //   setSelectedItem((prevSelectedItem) => {
    //     const isSelected = prevSelectedItem === index;
    //     dispatch(selectTitle(isSelected ? '' : title));
    //     return isSelected ? null : index;
    //   });
    // };
    
    // const datatableUsers = [
    //     {
    //       name: "Ім'я облікового запису 1",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 1
    //     },
    //     {
    //       name: "Ім'я облікового запису 2",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 2
    //     },
    //     {
    //       name: "Ім'я облікового запису 3",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 3
    //     },
    //     {
    //       name: "Ім'я облікового запису 4",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 4
    //     },
    //     {
    //       name: "Ім'я облікового запису 5",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 5
    //     },
    //     {
    //       name: "Ім'я облікового запису 6",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 6
    //     },
    //     {
    //       name: "Ім'я облікового запису 7",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 7
    //     },
    //     {
    //       name: "Ім'я облікового запису 8",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 8
    //     },
    //     {
    //       name: "Ім'я облікового запису 9",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 9
    //     },
    //     {
    //       name: "Ім'я облікового запису 10",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 10
    //     },
    //     {
    //       name: "Ім'я облікового запису 11",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 11
    //     },
    //     {
    //       name: "Ім'я облікового запису 12",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 12
    //     },
    //     {
    //       name: "Ім'я облікового запису 13",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 13
    //     },
    //     {
    //       name: "Ім'я облікового запису 14",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 14
    //     },
    //     {
    //       name: "Ім'я облікового запису 15",
    //       quantity: "1/4",
    //       payment: true,
    //       payment2: false,
    //       date: "15/12/2024",
    //       money: 10,
    //       id: 15
    //     },
    //   ]
    // const getData = (current:number, pageSize:number) => datatableUsers.slice((current - 1) * pageSize, current * pageSize);
 
    // const [perPage] = useState<number>(12);
    // const [size] = useState<number>(perPage);

    
// const next = () => {
//   if (active === Math.ceil(datatableUsers.length / perPage)) return;

//   const newPage = current + 1;

//   dispatch(selectTitle(''));
//   setSelectedItem(null)

//   if (newPage <= Math.ceil(datatableUsers.length / perPage)) {
//     setActive(newPage);
//     setCurrent(newPage);
//   }
// };
     
// const prev = () => {
//   if (active === 1) return;

//   const newPage = current - 1;
//   dispatch(selectTitle(''));
//   setSelectedItem(null)

//   if (newPage > 0) {
//     setActive(newPage);
//     setCurrent(newPage);
//   }
// };


useEffect(() => {
  verifyUser()
    .then(({data}) => {
        setUserId(data.data.id)  
        getAllUsers(data.data.id)
          .then(res => {
            setUsers(res.users)
            setLoading(false)
          })
    }) 
    .catch(err => console.log(err))
}, [token])

useEffect(() =>{
  getAllUsers()
      .then(res => {
          setUsers(res.users)
          setLoading(false)
        })    
},[token])

if(!users){
  return <CreateUsers></CreateUsers>
}

    return(
      <>
      {!loading && 
        <div className='help__panel w-full'>     
        {isMobile ? 
          <div className="header__title__page text-sx font-semibold flex items-center overflow-x-scroll">
            <span className={`uppercase font-semibold text-base ${title ?  "text-black-3": 'text-black-2'}`}>{t('help_panel.title')}</span>
            <span className={`text-black-2 uppercase ${title ?  "active": ''}`}>{title}</span>
          </div>
        : ''}
        <div className="help__panel__conteiner bg-white1">
        {/* {datatableUsers.length >= perPage ? 
<div className="table__control flex items-center justify-end focus:outline-none">
<IconButton
size="sm"
variant="outlined"
onClick={prev}
className="border-none outline-0 shadow-none"
>
<img src={Arrow} alt="" />
</IconButton>
<Typography color="gray" className="font-normal">
<strong className="text-gray-900">{active}</strong> з{" "}
<strong className="text-gray-900">{Math.ceil(datatableUsers.length / perPage)}</strong>
</Typography> 

<IconButton
size="sm"
variant="outlined"
onClick={next}
className="border-none outline-0 shadow-none"
>
<img src={Arrow} alt="" className="rotate-180"/>
</IconButton>
  </div>
: null    
} */}
        {/* <div className="data__table border border-gray-2">
            <div className="table__title bg-gray-2">
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
                Ім'я облікового запису
              </div>
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
                Користувачі
              </div>
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
              {
                isMobile
                  ? (isMobileSmall ? 'CN' : 'Передплата CN')
                  : 'Передплата Chicken Nuggets'
              }              
              </div>
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
              {
                isMobile
                  ? (isMobileSmall ? 'GN' : 'Передплата GN')
                  : 'Передплата Canja de Galinha'
              }       
              </div>
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
                Сплив передплати
              </div>
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
                Гал передплат
              </div>
            </div>            
            {getData(current, size).map((item, i) => {
                return <TableItem item={item} index={i} handleClick={handleClick} selectedItem={selectedItem}></TableItem>
            })}           
        </div>    */}
        <div className="data__table owner border border-gray-2">
        
            <div className="table__title bg-gray-2 mb-6">
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
              {t('help_panel.users')}
              </div>
    
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
              {
                isMobile
                  ? (isMobileSmall ? 'CN' : 'Передплата CN')
                  : t('help_panel.chicken_nuggets_subscription')
              }              
              </div>
              <div className="cell text-black-3 md:text-sm text-xs font-bold text-center">
              {
                isMobile
                  ? (isMobileSmall ? 'GN' : 'Передплата GN')
                  :  t('help_panel.canja_de_galinha_subscription')
              }       
              </div>
              
            </div>    
            {users.map(user => (
              <div className="row ">
                <div className="row__item text-sm font-normal">{user.firstName}</div>
                          <div className="row__item__payment flex w-full">
                          <div className="row__item">
                           

                           <div className={`additional_information__payment bg-gray-2 flex items-center ${!user.prepayment ? 'prepayment__no' : ''}`}>
                                 <div className="payment__left">
                                   {user.prepayment && 
                                         <>
                                           <div className="payment__title text-sm text-black-3 font-bold  text-left">{!isMobileIpad ? "Chicken Nuggets" : 'CN'}</div>
                                           <div className="payment__user text-left text-blue-1 font-semibold text-xs"></div>
                                         </>
                                   }

                                 </div>
                                 <div className="payment__right">
                                   {user.prepayment &&
                                       <>
                                          <div className="payment__prepayment text-black-2 text-xs font-bold whitespace-nowrap">{t('help_panel.subscriptions')}: {user.prepayment.chickenNuggets.date.length}</div>
                                         <div className="payment__date text-black-3 text-sm font-normal">15/12/2024</div>
                                       </>
                                   }
                                  
                                 </div>
                               </div>  

                      
                               
       
                         </div>
                           <div className="row__item">
                             <div className="additional_information__payment disabled bg-gray-2 flex items-center">
                                 
                             </div>  
                           </div>
                          </div>
                            
                            
                              
                            </div>
            ))}
            
        </div>   
        </div>
    </div>
      
    }
        
      </>
        
    )
}
export default HelpPanel
