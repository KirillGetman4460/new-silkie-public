// @ts-nocheck
import { useRef,useCallback,useState } from 'react'

import { useTranslation } from 'react-i18next';

import Modal from '../settingSite/modal.tsx'
import ModalAuth from '../auth/modalAuth.tsx'
import ModalRegister from '../auth/register.tsx'
import ModalReset from '../auth/resetPassword.tsx'

import Breadcrumbs from '../breadcrumb/breadcrumb.jsx'
import {useAppSelector,useAppDispatch} from '../../store/hooks/hooks.ts'
import {setRole,setId} from '../../store/userData/userData.slice.ts'
import {setMenuActive} from '../../store/header/headerSlice'
import { useMediaQuery } from 'react-responsive'
import { useLocation,useNavigate  } from 'react-router-dom';
import SettingIcon from '../../icons/streamline_interface-setting-cog-work-loading-cog-gear-settings-machine.svg'
import MakiEntrance from '../../icons/maki_entrance-alt1.svg'

import './header.scss'
import './headerMedia.scss'
const Header = () =>{
    // const [token] = useState(localStorage.getItem('token'))

    const navigate = useNavigate();

    const { t } = useTranslation();

    const ref = useRef<HTMLDialogElement>(null);
    const refAuth = useRef<HTMLDialogElement>(null);
    const refRegister = useRef<HTMLDialogElement>(null);
    const refReset = useRef<HTMLDialogElement>(null);

    const {pathname} = useLocation();

    const {title, lang, valut,menuActive} = useAppSelector(state => state.header)
    const dispatch = useAppDispatch()

    const isMobile = useMediaQuery({
        query: '(max-width: 1199px)'
    })
    const isMobileTwo = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const handleShow = useCallback(() => ref.current?.showModal(), [ref]);
    const handleShowAuth = useCallback(() => refAuth.current?.classList.add('modal-open'), [refAuth]);
    const handleShowRegister = useCallback(() => refRegister.current?.classList.add('modal-open'), [refRegister]);
    const handleShowReset = useCallback(() => refReset.current?.classList.add('modal-open'), [refReset]);

    const exitUser = () =>{
        dispatch(setId(''))
        dispatch(setRole(''))
        localStorage.removeItem('token');
        navigate('/')
    }

    return(
        <header className="header bg-white1">
            <div className="header__conteiner flex items-center">    
            {!isMobile ?  <input type="text" placeholder="Ім’я кабінету користувача" className="input max-w-[280px] bg-gray-1 text-center text-sm font-normal rounded-none w-full focus:outline-none" />  : 
                <button className="burger__menu" onClick={() => dispatch(setMenuActive(!menuActive))}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.625C0 5.32663 0.118526 5.04048 0.329505 4.8295C0.540483 4.61853 0.826631 4.5 1.125 4.5H22.875C23.1734 4.5 23.4595 4.61853 23.6705 4.8295C23.8815 5.04048 24 5.32663 24 5.625C24 5.92337 23.8815 6.20952 23.6705 6.4205C23.4595 6.63147 23.1734 6.75 22.875 6.75H1.125C0.826631 6.75 0.540483 6.63147 0.329505 6.4205C0.118526 6.20952 0 5.92337 0 5.625ZM0 12C0 11.7016 0.118526 11.4155 0.329505 11.2045C0.540483 10.9935 0.826631 10.875 1.125 10.875H22.875C23.1734 10.875 23.4595 10.9935 23.6705 11.2045C23.8815 11.4155 24 11.7016 24 12C24 12.2984 23.8815 12.5845 23.6705 12.7955C23.4595 13.0065 23.1734 13.125 22.875 13.125H1.125C0.826631 13.125 0.540483 13.0065 0.329505 12.7955C0.118526 12.5845 0 12.2984 0 12ZM1.125 17.25C0.826631 17.25 0.540483 17.3685 0.329505 17.5795C0.118526 17.7905 0 18.0766 0 18.375C0 18.6734 0.118526 18.9595 0.329505 19.1705C0.540483 19.3815 0.826631 19.5 1.125 19.5H22.875C23.1734 19.5 23.4595 19.3815 23.6705 19.1705C23.8815 18.9595 24 18.6734 24 18.375C24 18.0766 23.8815 17.7905 23.6705 17.5795C23.4595 17.3685 23.1734 17.25 22.875 17.25H1.125Z" fill="#FFC156"/>
                    </svg>
                </button>
            }                     
                <div className="header__content flex flex-row items-center ipad:justify-between justify-end w-full">
                    {!isMobileTwo ?
                        <div className="header__title__page text-base font-semibold flex items-center">
                            {pathname === '/help-panel' ? 
                                <div className='overflow-x-auto'>
                                    <span className={`uppercase font-semibold text-base ${title ?  "text-black-3": 'text-black-2'}`}>{t('help_panel.title')}</span>
                                    <span className={`text-black-2 uppercase ${title ?  "active": ''}`}>{title}</span>
                                </div>
                            :<Breadcrumbs/>}   
                        </div>
                    : null}             
                <div className="header__content__left flex flex-row items-center">
                <div className="header__site__settings flex items-center" onClick={() => handleShow()}>
                    <div className="site__settings__icon">
                     <img src={SettingIcon} alt="Your SVG" />
                    </div>
                    <div className="site__settings__lang text-black-3 text-base font-semibold uppercase">
                    {!lang ? 'ua' : lang === 'Українська' || lang === 'Ukrainian'  ? 'ua' : lang === 'Англійська' || lang === 'English' ? 'en' : lang}
                    </div>
                    <div className="site__settings__money text-black-3 text-base font-semibold">
                        {valut}
                    </div>
                </div>
                {localStorage.getItem('token') ?  <div className="header__auth" onClick={() => exitUser()}>
                            <img src={MakiEntrance} alt="" />
                            </div>
                        :
                        <div className="header__auth" onClick={() => handleShowAuth()}>
                            <img src={MakiEntrance} alt="" />
                        </div>
                }
               
                </div>
                </div>
               
            <Modal active={ref}></Modal>
            {!localStorage.getItem('token') && (
                <>
                    <ModalAuth active={refAuth} handleShowRegister={handleShowRegister} handleShowReset={handleShowReset} ></ModalAuth>
                    <ModalRegister handleShowAuth={handleShowAuth} active={refRegister}/>
                    <ModalReset active={refReset}></ModalReset>
                </>
            )}
            
            </div>
            
        </header>
    )
}
export default Header