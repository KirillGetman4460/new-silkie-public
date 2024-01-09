// @ts-nocheck
import axios from "axios"
import { useState,useEffect,useCallback } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector } from "../../store/hooks/hooks.ts"
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../breadcrumb/breadcrumb.tsx'

import Checkbox from '../../ui/checkbox'
import Accordion from './accordion.tsx'
import './permissions.scss'
import './permissionsMedia.scss'
const permissions = () =>{

    const { t } = useTranslation();
    const [token] = useState(localStorage.getItem('token'))
    const [title] = useState(['Назва','Власник','Щитач','Привідець','Користувач'])

    const [loading,setLoading] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null);

    const id = useAppSelector(state => state.userData.id)

    const isIpad = useMediaQuery({
        query: '(max-width: 768px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)'
    })

    const [permissionsData,setPermissionsData] = useState<any>({
      helpPanel: {
        owner:  false,
        organizer:  false,
        reader: false,
        user:  false
      },
      basket: {
        owner:  false,
        organizer:  false,
        reader:  false,
        user:  false
      },
      users: {
        owner:  false,
        organizer:  false,
        reader:  false,
        user:  false
      },
      profile: {
        owner:  false,
        organizer: false,
        reader: false,
        user: false
      },
      documentation: {
        owner:   false,
        organizer:   false,
        reader:   false,
        user:   false
      },
      payments: {
        owner:   false,
        organizer:   false,
        reader:   false,
        user:   false,
      },
      editEmail: {
        owner: false,
        organizer: false,
        reader: false,
        user: false
      },
      editPassword: {
        owner:  false,
        organizer:  false,
        reader:  false,
        user:  false,
      },
      editMyEmail: {
        owner: false,
        organizer:  false,
        reader:  false,
        user:  false,
      },
      editMyPassword: {
        owner:  false,
        organizer:  false,
        reader:  false,
        user: false,
      },
      createUser: {
        owner: false,
        organizer: false,
        reader: false,
        user: false
      },
      editRole: {
        owner: false,
        organizer:  false,
        reader:  false,
        user:  false
      },
      editPayment: {
        owner:  false,
        organizer:  false,
        reader:  false,
        user: false,
      },
      createPay: {
        owner: false,
        organizer:  false,
        reader:  false,
        user:  false
      },
      deleteUser: {
        owner:  false,
        organizer: false,
        reader:  false,
        user:  false
      }
    })

    const handleCheckboxChange = (category, key, subKey) => {
      if (subKey) {
        setPermissionsData(prevData => ({
          ...prevData,
          [category]: {
            ...prevData[category],
            [key]: {
              ...prevData[category][key],
              [subKey]: !prevData[category][key][subKey]
            }
          }
        }));
      } else {
        setPermissionsData(prevData => ({
          ...prevData,
          [category]: {
            ...prevData[category],
            [key]: !prevData[category][key]
          }
        }));
      }
    };

    const getPermissions = async() =>{
      const res = await axios.get(`${process.env.REACT_APP_SERVER}permissions/one`,{params:{userId:`${id}`}})
      return res.data
    }

    const editPermissions = async() =>{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}permissions/edit`,{
        userId: id,
        ...permissionsData
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      return res.data
    }

    const handleClick = (index: any) => {
      setSelectedItem((prevSelectedItem) => {
        const isSelected = prevSelectedItem === index;
        return isSelected ? null : index;
      });
    };
  

    const[firstRender,setFirstRender] = useState(false)
    useEffect(() =>{ 
      if(!firstRender) return setFirstRender(true)
      editPermissions()    
    },[])

    useEffect(() =>{
      editPermissions()
    },[handleCheckboxChange])


    useEffect(() => {
      getPermissions()
        .then(res => {    
          setPermissionsData({
              helpPanel: {
                owner:  res.permissions.helpPanel.owner,
                organizer:  res.permissions.helpPanel.organizer,
                reader: res.permissions.helpPanel.reader,
                user:  res.permissions.helpPanel.user
              },
              basket: {
                owner: res.permissions.basket.owner,
                organizer:  res.permissions.basket.organizer,
                reader:  res.permissions.basket.reader,
                user:  res.permissions.basket.user
              },
              users: {
                owner: res.permissions.users.owner,
                organizer:  res.permissions.users.organizer,
                reader:  res.permissions.users.reader,
                user:  res.permissions.users.user,
              },
              profile: {
                owner:  res.permissions.profile.owner,
                organizer: res.permissions.profile.organizer,
                reader: res.permissions.profile.reader,
                user: res.permissions.profile.user,
              },
              documentation: {
                owner: res.permissions.documentation.owner,
                organizer: res.permissions.documentation.organizer,
                reader: res.permissions.documentation.reader,
                user:res.permissions.documentation.user,
              },
              payments: {
                owner: res.permissions.payments.owner,
                organizer:  res.permissions.payments.organizer,
                reader:   res.permissions.payments.reader,
                user:   res.permissions.payments.user,
              },
              editEmail: {
                owner: res.permissions.editEmail.owner,
                organizer: res.permissions.editEmail.organizer,
                reader: res.permissions.editEmail.reader,
                user: res.permissions.editEmail.user,
              },
              editPassword: {
                owner: res.permissions.editPassword.owner,
                organizer: res.permissions.editPassword.organizer,
                reader: res.permissions.editPassword.reader,
                user:  res.permissions.editPassword.user,
              },
              editMyEmail: {
                owner: res.permissions.editMyEmail.owner,
                organizer:  res.permissions.editMyEmail.organizer,
                reader:  res.permissions.editMyEmail.reader,
                user: res.permissions.editMyEmail.user,
              },
              editMyPassword: {
                owner:  res.permissions.editMyPassword.owner,
                organizer:  res.permissions.editMyPassword.organizer,
                reader:  res.permissions.editMyPassword.reader,
                user: res.permissions.editMyPassword.user,
              },
              createUser: {
                owner: res.permissions.createUser.owner,
                organizer: res.permissions.createUser.organizer,
                reader: res.permissions.createUser.reader,
                user:res.permissions.createUser.user,
              },
              editRole: {
                owner:res.permissions.editRole.owner,
                organizer:  res.permissions.editRole.organizer,
                reader: res.permissions.editRole.reader,
                user:  res.permissions.editRole.user,
              },
              editPayment: {
                owner: res.permissions.editPayment.owner,
                organizer: res.permissions.editPayment.organizer,
                reader: res.permissions.editPayment.reader,
                user: res.permissions.editPayment.user,
              },
              createPay: {
                owner: res.permissions.createPay.owner,
                organizer: res.permissions.createPay.organizer,
                reader:  res.permissions.createPay.reader,
                user:  res.permissions.createPay.user,
              },
              deleteUser: {
                owner:  res.permissions.deleteUser.owner,
                organizer: res.permissions.deleteUser.organizer,
                reader:  res.permissions.deleteUser.reader,
                user:  res.permissions.deleteUser.user,
              }
            })
        })
        .catch(err => console.log(err))
      
    },[])

   
    
    return(
        <div className="permissions w-full">    
            {isIpad ? 
              <div className="header__title__page text-sx font-semibold flex items-center overflow-x-auto bg-gray-1">
                <Breadcrumbs/>
              </div>
            : ''}
            <div className="permissions__conteiner bg-white1">
                <div className="permissions__content">
                    <div className="permissions__table border border-gray-2">
                        <div className="permissions__table__title flex bg-gray-2 border-b border-gray-2">
                            <div className="cell text-center text-black-3 font-bold text-sm">{t('permissions.table_title_title')}</div>
                            <div className="cell text-center text-black-3 font-bold text-sm">{t('permissions.table_title_owner')}</div>
                            <div className="cell text-center text-black-3 font-bold text-sm">{t('permissions.table_title_shield')}</div>
                            <div className="cell text-center text-black-3 font-bold text-sm">{t('permissions.table_title_guide')}</div>
                            <div className="cell text-center text-black-3 font-bold text-sm">{t('permissions.table_title_user')}</div>
                        </div>
                       
                             <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 1 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(1)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.helpPanel')}</div>
                                {Object.keys(permissionsData.helpPanel).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('helpPanel', key)} checked={permissionsData.helpPanel[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 1 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={1} item={permissionsData.helpPanel} handleCheckboxChange={handleCheckboxChange} category="helpPanel"></Accordion>} 
                              
                           
                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 2 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(2)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.basket')}</div>
                                {Object.keys(permissionsData.basket).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('basket', key)} checked={permissionsData.basket[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 2 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={2} item={permissionsData.basket} handleCheckboxChange={handleCheckboxChange} category="basket"></Accordion>} 

                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 3 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(3)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.users')}</div>
                                {Object.keys(permissionsData.users).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('users', key)} checked={permissionsData.users[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 3 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={3} item={permissionsData.users} handleCheckboxChange={handleCheckboxChange} category="users"></Accordion>} 

                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 4 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(4)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.profile')}</div>
                                {Object.keys(permissionsData.profile).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('profile', key)} checked={permissionsData.profile[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 4 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={4} item={permissionsData.profile} handleCheckboxChange={handleCheckboxChange} category="profile"></Accordion>} 

                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 5 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(5)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.documentation')}</div>
                                {Object.keys(permissionsData.documentation).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('documentation', key)} checked={permissionsData.documentation[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 5 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={5} item={permissionsData.documentation} handleCheckboxChange={handleCheckboxChange} category="documentation"></Accordion>} 
                              
                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 6 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(6)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.payments')}</div>
                                {Object.keys(permissionsData.payments).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('payments', key)} checked={permissionsData.payments[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 6 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={6} item={permissionsData.payments} handleCheckboxChange={handleCheckboxChange} category="payments"></Accordion>} 
                            
                              
                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 7 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(7)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.editEmail')}</div>
                                {Object.keys(permissionsData.editEmail).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('editEmail', key)} checked={permissionsData.editEmail[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 7 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={7} item={permissionsData.editEmail} handleCheckboxChange={handleCheckboxChange} category="editEmail"></Accordion>} 

                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 8 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(8)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.editMyPassword')}</div>
                                {Object.keys(permissionsData.editMyPassword).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('editMyPassword', key)} checked={permissionsData.editMyPassword[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 8 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={8} item={permissionsData.editMyPassword} handleCheckboxChange={handleCheckboxChange} category="editMyPassword"></Accordion>} 


                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 9 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(9)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.createUser')}</div>
                                {Object.keys(permissionsData.createUser).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('createUser', key)} checked={permissionsData.createUser[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 9 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={9} item={permissionsData.createUser} handleCheckboxChange={handleCheckboxChange} category="createUser"></Accordion>} 

                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 10 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(10)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.editRole')}</div>
                                {Object.keys(permissionsData.editRole).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('editRole', key)} checked={permissionsData.editRole[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 10 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={10} item={permissionsData.editRole} handleCheckboxChange={handleCheckboxChange} category="editRole"></Accordion>} 

                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 11 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(11)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.editPayment')}</div>
                                {Object.keys(permissionsData.editPayment).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('editPayment', key)} checked={permissionsData.editPayment[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 11 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={11} item={permissionsData.editPayment} handleCheckboxChange={handleCheckboxChange} category="editPayment"></Accordion>} 
                              
                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 12 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(12)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.editRole')}</div>
                                {Object.keys(permissionsData.createPay).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('createPay', key)} checked={permissionsData.createPay[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 12 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={12} item={permissionsData.createPay} handleCheckboxChange={handleCheckboxChange} category="createPay"></Accordion>} 

                              <div className={`permissions__table__row relative flex border-b border-gray-2 ${selectedItem === 13 ? 'selected hover:outline-none' : ''}`} onClick={() => handleClick(13)}>
                              <div className="cell text-sm font-normal text-black-3">{t('permissions.editPayment')}</div>
                                {Object.keys(permissionsData.deleteUser).map(key => (      
                                  <div key={key} className="cell text-center">
                                     <input type="checkbox" onChange={() => handleCheckboxChange('deleteUser', key)} checked={permissionsData.deleteUser[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />    
                                   </div>
                                ))}
                               
                              
                              {isMobile && <div className={`icon__arrow absolute ${selectedItem === 13 ? 'rotate-180' : ''}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122" />
                                </svg>
                              </div>}
                              </div>
                              {isMobile &&  <Accordion selectedItem={selectedItem} index={13} item={permissionsData.deleteUser} handleCheckboxChange={handleCheckboxChange} category="deleteUser"></Accordion>} 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default permissions