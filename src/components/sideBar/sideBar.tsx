import { useState } from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { useMediaQuery } from 'react-responsive'
import Arrow from '../svg/Arrow';
import DashBoard from '../svg/DashBoard'
import CreditCard from '../svg/CreditCard'
import Download from '../svg/Download'
import Shopping from "../svg/Shopiing"
import ParkOutline from '../svg/ParkOutline'
import BriefCase from '../svg/BriefCase'
import { Link,NavLink } from "react-router-dom";
import {useAppSelector,useAppDispatch} from '../../store/hooks/hooks.ts'
import {setMenuActive,setTitleRoute} from '../../store/header/headerSlice'
import { useTranslation } from 'react-i18next';
import './sideBar.scss'
import './sideBarMedia.scss'

const sideBar = () =>{

    const { t } = useTranslation();
    const isMobile = useMediaQuery({
      query: '(max-width: 1199px)'
    })
    const [open, setOpen] = useState<number>(0);
    const [openAccordion, setOpenAccordion] = useState<number>(0);
    const [openAccordionChild, setOpenAccordionChild] = useState<number>(0);
    const [openAccordionOrders,setOpenAccordionOrders] = useState<number>(0)
    const [openAccordionUsers,setOpenAccordionUsers] = useState<number>(0)

    const {menuActive} = useAppSelector(state => state.header)
    // const {role} = useAppSelector(state => state.userData)
    const dispatch = useAppDispatch()
 
    const handleOpen = (value:number) => {
        setOpen(value)
        setOpenAccordionChild(0)
        setOpenAccordion(0)
        setOpenAccordionUsers(0)
        setOpenAccordionOrders(0)
    }
   const handleOpenAccordion = (value:number) => {
      setOpen(-1)
      setOpenAccordionChild(0)
      setOpenAccordion(openAccordion === value ? 0 : value)
      setOpenAccordionUsers(0)
   }
   const handleAccordionChild = () => {
    setOpenAccordionChild((prevValue) => (prevValue === 0 ? 1 : 0))
   }
    return (
      <>
        <div className={`sideBar w-full max-w-[328px] bg-white1 ${menuActive ? "active" : ''}`}>  
            {isMobile ? <input type="text" placeholder="Ім’я кабінету користувача" className="input bg-gray-1 text-center text-sm font-normal rounded-none w-full focus:outline-none" /> : null}
             <Card className="bg-white1 shadow-none rounded-none w-full border">   
      <List className='p-0 gap-0'>
      <NavLink to='/'
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
      <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2  ${open == 0 ? 'focus:bg-yellow-5 active:bg-yellow-5 bg-yellow-5' : null}`} onClick={() => handleOpen(0)}>
          <ListItemPrefix>
            <DashBoard color={open}/>
          </ListItemPrefix>
            <div className={`item__text font-semibold text-sm ${open == 0 ? 'text-white1' : 'text-black-3'}`}>{t('sideBar.help_panel')}</div>  
        </ListItem>
      </NavLink>   
        <Accordion
          open={openAccordion === 1}
          icon={
            <Arrow/>    
          }>
          <ListItem onClick={() => dispatch(setTitleRoute('Кошик замовлень'))} className={`rounded-none p-0 ${openAccordion == 1 ? 'focus:bg-yellow-5 active:bg-yellow-5 bg-yellow-5 hover:opacity-100 hover:bg-yellow-5 border-0' : "hover:bg-gray-2 border-b border-gray-2"}`} selected={openAccordion === 1}>
            <AccordionHeader onClick={() => handleOpenAccordion(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <Shopping color={openAccordion}/> 
              </ListItemPrefix>
              <Typography className={`mr-auto font-semibold text-sm ${openAccordion == 1 ? 'text-white1' : 'text-black-3'} `}>
              {t('sideBar.сart_of_orders')}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="p-0">
            <List className="p-0 gap-0">
              <Link to='/orders'>
                <ListItem onClick={() => setOpenAccordionOrders(1)} className={`pl-11 rounded-none tex-sm font-normal border-b ${openAccordionOrders === 1 ? "bg-yellow-4 focus:bg-yellow-4 active:bg-yellow-4 hover:opacity-100 focus:text-white text-white" : "border-b border-gray-2 "}`}>{t('sideBar.orders')}</ListItem>
              </Link>
              <NavLink to='/translation-history'>
                <ListItem onClick={() => setOpenAccordionOrders(2)} className={`pl-11 rounded-none tex-sm font-normal border-b ${openAccordionOrders === 2 ? "bg-yellow-4 focus:bg-yellow-4 active:bg-yellow-4 hover:opacity-100 focus:text-white text-white" : "border-b border-gray-2 "}`}>{t('sideBar.translation_history')}</ListItem>
              </NavLink>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={openAccordion === 2}
          icon={<Arrow />}
        >
          <ListItem className={`hover:bg-gray-2 rounded-none p-0  ${openAccordion == 2 ? 'focus:bg-yellow-5 active:bg-yellow-5 bg-yellow-5 hover:opacity-100 hover:bg-yellow-5 border-0' : "hover:bg-gray-2 border-b border-gray-2"}`} selected={openAccordion === 2}>
            <AccordionHeader onClick={() => handleOpenAccordion(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ParkOutline color={openAccordion}/>
              </ListItemPrefix>
              <Typography className={`mr-auto font-semibold text-s ${openAccordion == 2 ? 'text-white1' : 'text-black-3'}`}>
              {t('sideBar.users_and_permissions')}
              </Typography>
            </AccordionHeader>           
          </ListItem>       
          <AccordionBody className="p-0">
            <List className="p-0 gap-0">
              <Accordion
          open={openAccordionChild === 1}
          icon={
            <Arrow/>
          }
        >
            <ListItem className={`p-0 rounded-none  ${openAccordionChild === 1 ? "border-0" : "border-b border-gray-2"}`} selected={openAccordionChild === 1}>   
            <AccordionHeader onClick={() => handleAccordionChild()} className={`border-b-0 p-3 pl-11 ${openAccordionChild === 1 ? 'bg-yellow-4 focus:bg-yellow-4 active:bg-yellow-4 hover:opacity-100' : 'hover:bg-gray-2'}`}>
              <Typography color="blue-gray" className={`mr-auto font-semibold text-sm rounded-none ${openAccordionChild === 1 ? 'text-white1' : 'text-black-3'}`}>
              {t('sideBar.users')}
              </Typography>
            </AccordionHeader>            
            </ListItem>  
          <AccordionBody className="p-0">
            <List className="p-0 gap-0">
              <Link to='users'>
                <ListItem selected={openAccordionUsers === 1} onClick={() => setOpenAccordionUsers(1)} className={`pl-11 rounded-none tex-sm font-normal border-b ${openAccordionUsers === 1 ? "bg-yellow-4 focus:bg-yellow-4 active:bg-yellow-4 hover:opacity-100 focus:text-white text-white" : "border-b border-gray-2 "}` }>{t('sideBar.users')}</ListItem>
              </Link>
              <ListItem selected={openAccordionUsers === 1} onClick={() => setOpenAccordionUsers(2)} className={`pl-11 rounded-none tex-sm font-normal border-b ${openAccordionUsers === 2 ? "bg-yellow-4 focus:bg-yellow-4 active:bg-yellow-4 hover:opacity-100 focus:text-white text-white" : "border-b border-gray-2 "}`}>{t('sideBar.account_outline')}</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
            </List>
            
               <NavLink to="permissions">
                  <ListItem className='pl-11 rounded-none tex-sm text-black-3 font-semibold border-b border-gray-2'>{t('sideBar.permissions')}</ListItem>
                </NavLink>
                 
          </AccordionBody>          
        </Accordion>
        <Accordion
          open={openAccordion === 3}
          icon={<Arrow/>}
        >
          <ListItem className={`hover:bg-gray-2 rounded-none p-0 border-b border-gray-2  ${openAccordion == 3 ? 'focus:bg-yellow-5 active:bg-yellow-5 bg-yellow-5 hover:opacity-100 hover:bg-yellow-5' : "hover:bg-gray-2"}`}  selected={openAccordion === 3}>
            <AccordionHeader onClick={() => handleOpenAccordion(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <BriefCase color={openAccordion}/>
                </ListItemPrefix>
              <Typography className={`mr-auto font-semibold text-s ${openAccordion == 3 ? 'text-white1' : 'text-black-3'}`}>
              {t('sideBar.documentation')}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="p-0">
            <List className='p-0 gap-0'>   
              <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2 pl-11 font-semibold text-sm text-black-3}`}>{t('sideBar.ppo')}</ListItem>
              <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2 pl-11 font-semibold text-sm text-black-3}`}>{t('sideBar.data_base')}</ListItem>
              <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2 pl-11 font-semibold text-sm text-black-3}`}>{t('sideBar.consent_to_data_processing')}</ListItem>
              <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2 pl-11 font-semibold text-sm text-black-3}`}>{t('sideBar.terms_and_conditions')}</ListItem>
              <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2 pl-11 font-semibold text-sm text-black-3}`}>{t('sideBar.privacy_policy')}</ListItem>
              <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2 pl-11 font-semibold text-sm text-black-3}`}>{t('sideBar.cookie_policy')}</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <NavLink to={'/payment-profile'}>
        <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 border-b border-gray-2 ${open == 1 ? 'focus:bg-yellow-5 active:bg-yellow-5 bg-yellow-5' : null}`} onClick={() => handleOpen(1)}>
          <ListItemPrefix>
            <CreditCard color={open}/>
          </ListItemPrefix>
          <div className={`item__text font-semibold text-sm ${open == 1 ? 'text-white1' : 'text-black-3'}`}> {t('sideBar.payment_profile')}</div>        
        </ListItem>
        </NavLink>
  
        <NavLink to='downloading-applications'>
        <ListItem className={`hover:bg-gray-2 rounded-none px-3 py-3 ${open == 2 ? 'focus:bg-yellow-5 active:bg-yellow-5 bg-yellow-5' : null}`} onClick={() => handleOpen(2)}> 
          <ListItemPrefix>
            <Download color={open}/>
          </ListItemPrefix>    
            <div className={`item__text font-semibold text-sm ${open == 2? 'text-white1' : 'text-black-3'}`}> {t('sideBar.downloading_applications')}</div>
        </ListItem>
        </NavLink>
    
      </List>
    </Card>
        </div>
        <div className={`sideBar__back ${menuActive ? "active" : ''}`} onClick={() => dispatch(setMenuActive(false))}></div>
      </>
    )
}
export default sideBar