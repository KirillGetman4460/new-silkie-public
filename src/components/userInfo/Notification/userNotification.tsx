// @ts-nocheck
import axios from "axios"
import { useState,useEffect,useCallback,memo } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
// import SwitchButton from '../../../ui/switchButton'
import { useTranslation } from 'react-i18next';
import Accordion from './accordion'
import './userNotification.scss'
import './userNotificationMedia.scss'
const userNotification = () =>{
  
  const [token] = useState(localStorage.getItem('token'))
  const {userId} = useParams();

  const { t } = useTranslation();

  const id = useAppSelector(state => state.userData.id) 

  const [title] = useState(['Назва','Email','Telegram','Whatsapp'])
  const [selectedItem, setSelectedItem] = useState(null);

  const isMobile = useMediaQuery({
      query: '(max-width: 767px)'
  })

  const [notificationData,setNotificationData] = useState<any>(
    {
      createProfile: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      deleteProfile: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      editPayment: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      infoPayment: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      reminder: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      prepayments: {
        one: {
          email: false,
          telegram: false,
          whatsapp: false,
        },
        two: {
          email: false,
          telegram: false,
          whatsapp: false,
        },
        three: {
          email: false,
          telegram: false,
          whatsapp: false,
        }
      },
      haveDontPay: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      editEmail: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      editPassword: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      addUser: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      deleteUser: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      editEmailExceptOwner: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      editPasswordExceptOwner: {
        email: false,
        telegram: false,
        whatsapp: false,
      },
      rolePasswordExceptOwner: {
        email:  false,
        telegram: false,
        whatsapp: false,
      }
    }
  );

  const [switchNotification,setSwitchNotification] = useState('one')
  

  const handleClick = (index: any) => {
      setSelectedItem((prevSelectedItem) => {   
        const isSelected = prevSelectedItem === index;
        return isSelected ? null : index;
      });
  };  

  const getNotifications = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_SERVER}notifications/one`,{params:{userId:id}})
    return res.data
  }

  const handleCheckboxChange = useCallback((category, key, subKey) => {
    if (subKey) {
      setNotificationData(prevData => ({
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
      setNotificationData(prevData => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [key]: !prevData[category][key]
        }
      }));
    }
  },[]);

  const editNotifications = async() =>{

    const res = await axios.post(`${process.env.REACT_APP_SERVER}notifications/edit`,
    {
      userId: id,
      ...notificationData
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    return res
  }

  const[firstRender,setFirstRender] = useState(false)

  useEffect(() =>{
    if(!firstRender) return setFirstRender(true)
    editNotifications()
  },[])

  useEffect(() => {
    editNotifications();
  }, [notificationData]);

  useEffect(() => { 
    getNotifications()  
      .then(res => {           
        setNotificationData({
          createProfile:{
            email:res.notifications.createProfile.email,
            telegram:res.notifications.createProfile.telegram,
            whatsapp:res.notifications.createProfile.whatsapp,
          },
          deleteProfile: {
            email: res.notifications.deleteProfile.email,
            telegram: res.notifications.deleteProfile.telegram,
            whatsapp: res.notifications.deleteProfile.whatsapp,
          },
          editPayment: {
            email: res.notifications.editPayment.email,
            telegram: res.notifications.editPayment.telegram,
            whatsapp: res.notifications.editPayment.whatsapp,
          },
          infoPayment: {
            email: res.notifications.infoPayment.email,
            telegram: res.notifications.infoPayment.telegram,
            whatsapp: res.notifications.infoPayment.whatsapp,
          },
          reminder: {
            email: res.notifications.reminder.email,
            telegram: res.notifications.reminder.telegram,
            whatsapp: res.notifications.reminder.whatsapp,
          },
          prepayments: {
            one: {
              email: res.notifications.prepayments.one.email,
              telegram: res.notifications.prepayments.one.telegram,
              whatsapp: res.notifications.prepayments.one.whatsapp,
            },
            two: {
              email: res.notifications.prepayments.two.email,
              telegram: res.notifications.prepayments.two.telegram,
              whatsapp: res.notifications.prepayments.two.whatsapp,
            },
            three: {
              email: res.notifications.prepayments.three.email,
              telegram: res.notifications.prepayments.three.telegram,
              whatsapp: res.notifications.prepayments.three.whatsapp,
            }
          },
          haveDontPay: {
            email: res.notifications.haveDontPay.email,
            telegram: res.notifications.haveDontPay.telegram,
            whatsapp: res.notifications.haveDontPay.whatsapp,
          },
          editEmail: {
            email: res.notifications.editEmail.email,
            telegram: res.notifications.editEmail.telegram,
            whatsapp: res.notifications.editEmail.whatsapp,
          },
          editPassword: {
            email: res.notifications.editPassword.email,
            telegram: res.notifications.editPassword.telegram,
            whatsapp: res.notifications.editPassword.whatsapp,
          },
          addUser: {
            email: res.notifications.addUser.email,
            telegram: res.notifications.addUser.telegram,
            whatsapp: res.notifications.addUser.whatsapp,
          },
          deleteUser: {
            email: res.notifications.deleteUser.email,
            telegram: res.notifications.deleteUser.telegram,
            whatsapp: res.notifications.deleteUser.whatsapp,
          },
          editEmailExceptOwner: {
            email: res.notifications.editEmailExceptOwner.email,
            telegram: res.notifications.editEmailExceptOwner.telegram,
            whatsapp: res.notifications.editEmailExceptOwner.whatsapp,
          },
          editPasswordExceptOwner: {
            email: res.notifications.editPasswordExceptOwner.email,
            telegram: res.notifications.editPasswordExceptOwner.telegram,
            whatsapp: res.notifications.editPasswordExceptOwner.whatsapp,
          },
          rolePasswordExceptOwner: {
            email:  res.notifications.rolePasswordExceptOwner.email,
            telegram: res.notifications.rolePasswordExceptOwner.telegram,
            whatsapp: res.notifications.rolePasswordExceptOwner.whatsapp,
          }
        })
      })
      .catch(err => console.log(err))
  },[])

 
    
    return(
        <div className="user__notification bg-white1">   
            <div className="user__notification__conteiner ">
                <div className="user__notification__content">
                    <div className="user__table border border-gray-2">
                        <div className="user__table__title bg-gray-2 border-b border-gray-2">
                            {title.map(item => <div className="cell text-center text-black-3 font-bold text-sm">{item}</div>)}
                        </div>
                        <div className={`user__row flex items-center ${selectedItem === 1 ? "active": ""}`} onClick={() => handleClick(1)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.createProfile')}</span>           
                                </div>              
                                {Object.keys(notificationData.createProfile).map(key => (
                                    <div className="cell text-center" key={key}>           
                                       <input type="checkbox" onChange={() => handleCheckboxChange('createProfile', key)} checked={notificationData.createProfile[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div>
                        {isMobile &&  <Accordion selectedItem={selectedItem} index={1} item={notificationData.createProfile} handleCheckboxChange={handleCheckboxChange} category="createProfile"></Accordion>} 
                       
                        <div className={`user__row flex items-center ${selectedItem === 2 ? "active": ""}`} onClick={() => handleClick(2)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.deleteProfile')}</span>           
                                </div>
                                {Object.keys(notificationData.deleteProfile).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('deleteProfile', key)} checked={notificationData.deleteProfile[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile && <Accordion selectedItem={selectedItem} index={2} item={notificationData.deleteProfile} handleCheckboxChange={handleCheckboxChange} category="deleteProfile"></Accordion>}
                        
                        <div className={`user__row flex items-center ${selectedItem === 3 ? "active": ""}`} onClick={() => handleClick(3)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.editPayment')}</span>           
                                </div>
                                {Object.keys(notificationData.editPayment).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('editPayment', key)} checked={notificationData.editPayment[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile && <Accordion selectedItem={selectedItem} index={3} item={notificationData.editPayment} handleCheckboxChange={handleCheckboxChange} category="editPayment"></Accordion>}
                        
                        <div className={`user__row flex items-center ${selectedItem === 4 ? "active": ""}`} onClick={() => handleClick(4)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.infoPayment')}</span>           
                                </div>
                                {Object.keys(notificationData.infoPayment).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('infoPayment', key)} checked={notificationData.infoPayment[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile &&  <Accordion selectedItem={selectedItem} index={4} item={notificationData.editPayment} handleCheckboxChange={handleCheckboxChange} category="editPayment"></Accordion>}
                       
                        <div className={`user__row flex items-center ${selectedItem === 5 ? "active": ""}`} onClick={() => handleClick(5)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.reminder')}</span>           
                                </div>
                                {Object.keys(notificationData.reminder).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('reminder', key)} checked={notificationData.reminder[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile && <Accordion selectedItem={selectedItem} index={5} item={notificationData.reminder} handleCheckboxChange={handleCheckboxChange} category="reminder"></Accordion>}
                        <div className={`user__row flex items-center ${selectedItem === 6 ? "active": ""}`} onClick={() => handleClick(6)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>Передплати за 
                                    <span className={`pay__btn cursor-pointer ${switchNotification === 'one' ? 'active' : ''}`} onClick={() => {
                                      handleClick(5)
                                      setSwitchNotification('one')
                                    }}>1</span>
                                    <span className={`pay__btn cursor-pointer ${switchNotification === 'two' ? 'active' : ''}`} onClick={() => {
                                      handleClick(5)
                                      setSwitchNotification('two')
                                    }}>2</span>
                                    <span className={`pay__btn cursor-pointer ${switchNotification === 'three' ? 'active' : ''}`} onClick={() => {
                                      handleClick(5)
                                      setSwitchNotification('three')
                                    }}>3</span> дні</span>           
                                </div>


                                {Object.keys(notificationData.prepayments).map(key => (
  <div key={key} className="checkbox__pay flex">
    <div className="cell text-center">
      <input
        type="checkbox"
        checked={notificationData.prepayments[switchNotification].email}
        onChange={() => handleCheckboxChange('prepayments', switchNotification, 'email')}
        className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`}
      />
    </div>
    <div className="cell text-center">
      <input
        type="checkbox"
        checked={notificationData.prepayments[switchNotification].telegram}
        onChange={() => handleCheckboxChange('prepayments', switchNotification, 'telegram')}
        className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`}
      />
    </div>
    <div className="cell text-center">
      <input
        type="checkbox"
        checked={notificationData.prepayments[switchNotification].whatsapp}
        onChange={() => handleCheckboxChange('prepayments', switchNotification, 'whatsapp')}
        className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`}
      />
    </div>
  </div>
))}

                        </div> 
                        {isMobile &&  <Accordion selectedItem={selectedItem} index={6} item={notificationData.prepayments} handleCheckboxChange={handleCheckboxChange} category="prepayments" switchNotification={switchNotification}></Accordion>}
                       
                         <div className={`user__row flex items-center ${selectedItem === 7 ? "active": ""}`} onClick={() => handleClick(7)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.haveDontPay')}</span>           
                                </div>
                                {Object.keys(notificationData.editEmail).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('editEmail', key)} checked={notificationData.editEmail[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile &&   <Accordion selectedItem={selectedItem} index={7} item={notificationData.editEmail} handleCheckboxChange={handleCheckboxChange} category="editEmail"></Accordion>}
                  
                        <div className={`user__row flex items-center ${selectedItem === 8 ? "active": ""}`} onClick={() => handleClick(8)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.editEmail')}</span>           
                                </div>
                                {Object.keys(notificationData.editPassword).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('editPassword', key)} checked={notificationData.editPassword[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile &&   <Accordion selectedItem={selectedItem} index={8} item={notificationData.editPassword} handleCheckboxChange={handleCheckboxChange} category="editPassword"></Accordion>}
                    
                        <div className={`user__row flex items-center ${selectedItem === 9 ? "active": ""}`} onClick={() => handleClick(9)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.addUser')}</span>           
                                </div>
                                {Object.keys(notificationData.addUser).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('addUser', key)} checked={notificationData.addUser[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile && <Accordion selectedItem={selectedItem} index={9} item={notificationData.addUser} handleCheckboxChange={handleCheckboxChange} category="addUser"></Accordion>}
                        
                        <div className={`user__row flex items-center ${selectedItem === 10 ? "active": ""}`} onClick={() => handleClick(10)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.deleteUser')}</span>           
                                </div>
                                {Object.keys(notificationData.deleteUser).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('deleteUser', key)} checked={notificationData.deleteUser[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div>
                        {isMobile &&  <Accordion selectedItem={selectedItem} index={10} item={notificationData.deleteUser} handleCheckboxChange={handleCheckboxChange} category="deleteUser"></Accordion> }
                       
                        <div className={`user__row flex items-center ${selectedItem === 11 ? "active": ""}`} onClick={() => handleClick(11)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.editEmailExceptOwner')}</span>           
                                </div>
                                {Object.keys(notificationData.editEmailExceptOwner).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('editEmailExceptOwner', key)} checked={notificationData.editEmailExceptOwner[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile && <Accordion selectedItem={selectedItem} index={11} item={notificationData.editEmailExceptOwner} handleCheckboxChange={handleCheckboxChange} category="editEmailExceptOwner"></Accordion>}
                        
                        <div className={`user__row flex items-center ${selectedItem === 12 ? "active": ""}`} onClick={() => handleClick(12)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.editPasswordExceptOwner')}</span>           
                                </div>
                                {Object.keys(notificationData.editPasswordExceptOwner).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('editPasswordExceptOwner', key)} checked={notificationData.editPasswordExceptOwner[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 
                        {isMobile && <Accordion selectedItem={selectedItem} index={12} item={notificationData.editPasswordExceptOwner} handleCheckboxChange={handleCheckboxChange} category="editPasswordExceptOwner"></Accordion>}
                        
                        <div className={`user__row flex items-center ${selectedItem === 13 ? "active": ""}`} onClick={() => handleClick(13)}>
                                <div className="user__row__content flex items-center justify-between">
                                    <span className='font-normal text-sm text-black-3'>{t('userNotification.rolePasswordExceptOwner')}</span>           
                                </div>
                                {Object.keys(notificationData.rolePasswordExceptOwner).map(key => (
                                    <div className="cell text-center" key={key}> 
                                       <input type="checkbox" onChange={() => handleCheckboxChange('rolePasswordExceptOwner', key)} checked={notificationData.rolePasswordExceptOwner[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                                    </div>
                                ))}
                        </div> 

                        {isMobile && <Accordion selectedItem={selectedItem} index={13} item={notificationData.createProfile} handleCheckboxChange={handleCheckboxChange} category="rolePasswordExceptOwner"></Accordion>}
                        
                        
                    </div>  

                </div>
            </div>
        </div>
    )
}
export default userNotification