// @ts-nocheck
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import {useAppSelector,useAppDispatch} from '../../store/hooks/hooks.ts'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink  } from 'react-router-dom'
import './style.scss'


const Breadcrumbs = () => {

const { t } = useTranslation();


const routes = [
  {
    path:'/help-panel', breadcrumb: `${t('sideBar.help_panel')}`
  },
  {
    path:'/users', breadcrumb: `${t('sideBar.users_and_permissions')}`,props: { title: `${t('sideBar.users')}` },
    children:[
      {
        path: "/users/:userId",
        children:[
          {
            path: "/users/:userId/profile", breadcrumb: `${t('sideBar.personal_data')}` ,
          },
          {
            path: "/users/:userId/notification", breadcrumb: `${t('sideBar.notification')}`,
          },
          {
            path: "/users/:userId/subscriptions", breadcrumb: `${t('sideBar.subscriptions')}`,
            children:[
              {
                path: "/users/:userId/subscriptions/chicken-nuggets", breadcrumb: "Chicken Nuggets",
              }
            ]
          },
          
        ]
      }
    ]
  },
  {
    path:'/orders', breadcrumb: `${t('sideBar.orders')}`,props: { title: `${t('sideBar.сart_of_orders')}` }
  },
  {
    path:'/translation-history', breadcrumb:`${t('sideBar.translation_history')}`, props: { title: `${t('sideBar.сart_of_orders')}` },
  },
  {
    path:'/payment-profile', breadcrumb:`${t('sideBar.payment_profile')}`
  },
  {
    path:'/permissions', breadcrumb:'дозволи',props: { title: `${t('sideBar.users_and_permissions')}` }
  },
  {
    path:'/downloading-applications', breadcrumb:`${t('sideBar.downloading_applications')}`
  },
  {
    path:'/payment-profile/recurring-payments', breadcrumb:'Платежі за налаштуваннями'
  }
];

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const ulRef = useRef(null);
  const [firstNameDisplayed, setFirstNameDisplayed] = useState(false);

  const {connectUsers} = useAppSelector(state => state.userData)

  const breadcrumbs = useBreadcrumbs(routes,{ disableDefaults: true });  

  useEffect(() => {
    
    const handleScroll = () => {
      const ulElement = ulRef.current;

      if (ulElement) {
        setTooltipVisible(ulElement.scrollWidth > ulElement.clientWidth);
      }
    };

    const ulElement = ulRef.current;

    if (ulElement) {
      ulElement.addEventListener('scroll', handleScroll);

      handleScroll();
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  return (
    <>
    <div className="breadcrumbs">
     {isTooltipVisible && (<div className="arrow__btn absolute">
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 9L5 5L1 1" stroke="#1D2122"/>
                            </svg>
                          </div>
      )}
      <ul className="breadcrumbs__list"  ref={ulRef}>
      {breadcrumbs.map(({ match, breadcrumb,title}) => (
        <>
          {title ? <li className="breadcrumbs__item uppercase">
            <NavLink key={match.pathname} to={match.pathname}>
              {title}
            </NavLink>
        </li> : null}
          {match.params.userId ?
                 <li className='breadcrumbs__item uppercase'>   
                  <NavLink key={match.pathname} to={match.pathname}>{match.params.userId ? (connectUsers.find(item => item.userId === match.params.userId) ? connectUsers.find(item => item.userId === match.params.userId).firstName : null) : null}</NavLink>
               </li> : ''
          }
         
          <li className="breadcrumbs__item uppercase">
            <NavLink key={match.pathname} to={match.pathname}>
              {breadcrumb}
            </NavLink>
        </li>
        </>

      ))}
      </ul>
    </div>

    </>
  );
};

export default Breadcrumbs