import axios from 'axios'
import { useState,useEffect } from 'react'
import {useAppDispatch} from './store/hooks/hooks.ts'
import {setId,setRole} from './store/userData/userData.slice.ts'
import {setAuthenticated} from './store/auth/authenticated.ts'
import SideBar from './components/sideBar/sideBar'
import Header from './components/header/header'
import HelpPanel from './components/helpPanel/helpPanel'
import CreateUsers from "./components/createUsers/createUsers";
import Users from "./components/users/users.tsx";
import UserInfo from './components/userInfo/userInfo.tsx'
import UserProfile from './components/userInfo/Profile/userProfile.tsx'
import PPO from './components/ppo/ppo.tsx'
import UserNotification from './components/userInfo/Notification/userNotification.tsx'
import UserSubscriptions from './components/userInfo/Subscriptions/userSubscriptions.tsx'
import Orders from './components/orders/orders.tsx'
import TranslationHistory from './components/translationHistory/translationHistory.tsx'
import PaymentProfile from './components/paymentProfile/paymentProfile.tsx';
import RecurringPayments from './components/paymentProfile/recurringPayments.tsx';
import ChickenNuggets from './components/userInfo/ChickenNuggets/chickenNuggets.tsx'
import Permissions from './components/permissions/permissions.tsx'
import Downloading from './components/downloading/downloading.tsx'
import {Route,Routes,Navigate } from "react-router-dom";

import {RequireAuth} from './RequireAuth.tsx'
import './i18n.ts';

function App() {
  const dispatch = useAppDispatch() 
  const [token] = useState(localStorage.getItem('token'))

  const verifyUser = async() => {
    const res = axios.post(`${process.env.REACT_APP_SERVER}auth/verify`,{},{
        headers: {
          'Authorization': `Bearer ${token}`,
        }
    })
      return res
    }
    useEffect(() => {
      verifyUser()
        .then(({data}) => {
          dispatch(setRole(data.data.role.replace(/'/g, '')))
          dispatch(setId(data.data.id))
          dispatch(setAuthenticated(true))
        })
        .catch(err => console.log(err))  
    },[token])
  return (
    <div className='main bg-gray-1'>
      <Header></Header>   
      <div className="conteiner flex flex-row">
        <SideBar></SideBar>     
        <Routes>
          <Route path="/help-panel" element={<HelpPanel />} />
          <Route path="/" element={<Navigate replace to="/help-panel" />} />
          <Route path="/create_user" element={<CreateUsers />} /> 
          <Route path="/orders" element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
          } /> 
          <Route path='/translation-history' element={
            <RequireAuth><TranslationHistory/></RequireAuth>       
          }/>    
          <Route path="/ppo" element={
            <RequireAuth> <PPO /></RequireAuth>       
          } />  
          <Route path="/users" element={
            <RequireAuth>
                 <Users />
            </RequireAuth>  
          } />
          <Route path="/permissions" element={
            <RequireAuth><Permissions /></RequireAuth>      
          } />
          <Route path="/downloading-applications" element={
            <RequireAuth><Downloading /></RequireAuth>        
          } />

          <Route path="/users/:userId" element={<RequireAuth><UserInfo /></RequireAuth>}>    

              <Route index path="profile*" element={<RequireAuth><UserProfile /></RequireAuth> }/> 

              <Route path="notification*" element={<RequireAuth><UserNotification /></RequireAuth>}/> 

              <Route path="subscriptions" element={
                <RequireAuth>  <UserSubscriptions /></RequireAuth>        
              }>
                <Route path="chicken-nuggets" element={
                  <RequireAuth>  <ChickenNuggets /></RequireAuth>           
                  } />  
                <Route/>
              
              </Route> 
          </Route>  

          <Route path="/payment-profile" element={
            <RequireAuth><PaymentProfile /></RequireAuth>
          } />
          <Route path="/payment-profile/recurring-payments" element={
            <RequireAuth> <RecurringPayments /></RequireAuth>
          } />
        </Routes>  
      </div>
    </div>
  )
}

export default App
