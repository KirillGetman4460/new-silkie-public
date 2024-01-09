// @ts-nocheck
import axios from 'axios'
import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom";
import getCurrentDate from '../../../helper/getCurrentDate.ts'
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import Trash from '../../../icons/carbon_trash-can.svg'
import { useTranslation } from 'react-i18next';

import './chickenNuggets.scss'
import './chickenNuggetsMedia.scss'

const chickenNuggets = () =>{  

    const [payment] = useState({title:'Chicken Nuggets',user:'Користувач'})

    const {userId} = useParams();

    const navigate = useNavigate();

    const { t } = useTranslation();

    const [january,setJanuary] = useState(false)
    const [february,setFebruary] = useState(false)
    const [march,setMarch] = useState(false)
    const [april,setApril] = useState(false)
    const [may,setMay] = useState(false)
    const [june,setJune] = useState(false)
    const [july,setJuly] = useState(false)
    const [august,setAugust] = useState(false)
    const [september,setSeptember] = useState(false)
    const [october,setOctober] = useState(false)
    const [november,setNovember] = useState(false)
    const [december,setDecember] = useState(false)

    const [activeJanuary,setActiveJanuary] = useState(false)
    const [activeFebruary,setActiveFebruary] = useState(false)
    const [activeMarch,setActiveMarch] = useState(false)
    const [activeApril,setActiveApril] = useState(false)
    const [activeMay,setActiveMay] = useState(false)
    const [activeJune,setActiveJune] = useState(false)
    const [activeJuly,setActiveJuly] = useState(false)
    const [activeAugust,setActiveAugust] = useState(false)
    const [activeSeptember,setActiveSeptember] = useState(false)
    const [activeOctober,setActiveOctober] = useState(false)
    const [activeNovember,setActiveNovember] = useState(false)
    const [activeDecember,setActiveDecember] = useState(false)


    const [activeUserJanuary,setActiveUserJanuary] = useState(false)
    const [activeUserFebruary,setActiveUserFebruary] = useState(false)
    const [activeUserMarch,setActiveUserMarch] = useState(false)
    const [activeUserApril,setActiveUserApril] = useState(false)
    const [activeUserMay,setActiveUserMay] = useState(false)
    const [activeUserJune,setActiveUserJune] = useState(false)
    const [activeUserJuly,setActiveUserJuly] = useState(false)
    const [activeUserAugust,setActiveUserAugust] = useState(false)
    const [activeUserSeptember,setActiveUserSeptember] = useState(false)
    const [activeUserOctober,setActiveUserOctober] = useState(false)
    const [activeUserNovember,setActiveUserNovember] = useState(false)
    const [activeUserDecember,setActiveUserDecember] = useState(false)


    const id = useAppSelector(state => state.userData.id) 
    const connectUsers = useAppSelector(state => state.userData.connectUsers)
  
    const [token] = useState(localStorage.getItem('token'))

    const [basket,setBasket] = useState<any>([])

    const [userData,setUserData] = useState<any>([])

    const getBasket = async() =>{
      const res = await axios.get(`${process.env.REACT_APP_SERVER}basket/one?userId=${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
       } 
      }
      )
      return res.data.data.basket
    }

    const currentItemBasket = (data: any, userIdToFind: string) => {
      if (Array.isArray(data)) {
        data.forEach(item => {
          const { userId, chickenNuggetsDates } = item;
    
          if (userId === userIdToFind && Array.isArray(chickenNuggetsDates) && chickenNuggetsDates.length > 0) {
            chickenNuggetsDates.forEach(dateString => {
              const month = parseInt(dateString.split('.')[1], 10);
    
              switch (month) {
                case 1:
                  setJanuary(true);
                  break;
                case 2:
                  setFebruary(true);
                  break;
                case 3:
                  setMarch(true);
                  break;
                case 4:
                  setApril(true);
                  break;
                case 5:
                  setMay(true);
                  break;
                case 6:
                  setJune(true);
                  break;
                case 7:
                  setJuly(true);
                  break;
                case 8:
                  setAugust(true);
                  break;
                case 9:
                  setSeptember(true);
                  break;
                case 10:
                  setOctober(true);
                  break;
                case 11:
                  setNovember(true);
                  break;
                case 12:
                  setDecember(true);
                  break;
                default:
                  break;
              }
            });
          }
        });
      } else {
        console.error("Invalid data. Expected an array.");
      }
    };
    

    // const busketUpdate = async (month: number) => {
    //   const startDate = getCurrentDate(month);
    
    //   const isDateAlreadyAdded = chickenNuggetsDates.some((data) => data === startDate);
    
    //   if (!isDateAlreadyAdded) {
    //     setChickenNuggetsDates((prevDataSwitch: string[]) => [
    //       ...prevDataSwitch,
    //       startDate,
    //     ]);
    //   }
    // };

    const postBasket = async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER}basket/update`,
        {
          userId: id,
          basket
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    }

    const clearBusket = async() =>{
      try {
        // await axios.post(
        //   `${process.env.REACT_APP_SERVER}basket/update`,
        //   {
        //     userId: id,
        //     basket: [],
        //   },
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //     },
        //   }
        // );
        setBasket([])
        setJanuary(false)
        setFebruary(false)
        setMarch(false)
        setApril(false)
        setMay(false)
        setJune(false)
        setJuly(false)
        setAugust(false)
        setSeptember(false)
        setOctober(false)
        setNovember(false)
        setDecember(false)
      } catch (error) {
        
      }
    }

    const createBasket = (userId:string, data:any) => {
      const checkBasket = basket.find(item => item.userId === userId);
      if (!checkBasket) {
        setBasket([...basket, {
          userId: userId,
          chickenNuggetsDates: [data],
          canjaDeGalinhaDates: []
        }]);
        return;
      }
      const editBasket = basket.map(item => {
        if (item.userId === userId) {
          if (!item.chickenNuggetsDates.includes(data)) {
            return {
              userId: item.userId,
              chickenNuggetsDates: [...item.chickenNuggetsDates, data],
              canjaDeGalinhaDates: item.canjaDeGalinhaDates
            };
          }
        }
        return item;
      });
      setBasket(editBasket);
    }

    const deleteDateFromBasket = (date:number) => {
      const currentDate = getCurrentDate(date)
      const updatedBasket = basket.map(item => {
        return {
          ...item,
          chickenNuggetsDates: item.chickenNuggetsDates.filter(d => d !== currentDate)
        };
      });
      setBasket(updatedBasket);
    }
    const getUsers = async() =>{
      const listDataUsers = await Promise.all(connectUsers.map(async item => {
        const user = await axios(`${process.env.REACT_APP_SERVER}profile/one?userId=${item.userId}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
        } 
        })
        if(user.data.code === 200){
          return 
        }
        return user.data
      }))
      listDataUsers.filter(item => item)
    }

    useEffect(() => {
      
      getUsers()
        .then(res => setUserData(res))
        .catch(err => console.log(err))
      
      getBasket()
        .then(res => {
          setBasket(res)    
          currentItemBasket(res,userId);
      })      
    }, []);

    
    return(
        <div className="chickenNuggets">
                <div className="subscriptions__title">{t('userSubscriptions.title')}</div>
                <div className="calendar__subscriptions">
                    <ul className="calendar__list">
                        <li className={`calendar__item cursor-pointer relative ${activeJanuary ? 'bg-gray-1' : 'bg-white'}`} 
                          onClick={() => {
                            setActiveJanuary(false)  
                            setActiveUserJanuary(true)         
                          }}
                        >
                            <div className={`calendar__item__title text-normal font-mediu text-center relative ${activeJanuary ? 'bg-gray-1' : 'bg-gray-1'}`}>{t('userSubscriptions.January')}</div>
                            {january && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveJanuary(true)
                                setJanuary(false)
                              }}>
                              <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                              
                              </div>                           
                            </div>
                            }     
                            {
                            activeUserJanuary ? 
                              <div className="payment__settings user flex items-center absolute"
                              onClick={(event) => event.stopPropagation()}
                             >
                             <div className="payment__users flex flex-col">
                              {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(1))
                                setActiveJanuary(false)
                                setJanuary(true)
                                setActiveUserJanuary(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                              
                             </div>
                            </div>: null
                            }                      
                              {activeJanuary ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveJanuary(false)
                                setJanuary(true)
                                setActiveUserJanuary(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(1)
                                    setActiveJanuary(false)
                                    setJanuary(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }                          
                            
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {                     
                            setActiveFebruary(false)  
                            setActiveUserFebruary(true)  
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.February')}</div>
                            {february && 
                               <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveFebruary(true)
                                setFebruary(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserFebruary ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(2))
                              setActiveFebruary(false)
                              setFebruary(true)
                              setActiveUserFebruary(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeFebruary ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 <div className="payment__users flex flex-col">
                                   <span className='text-normal font-semibold' onClick={() => {
                                      setActiveFebruary(false)
                                      setFebruary(true)
                                  }}>Користувач</span>
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(2)
                                    setActiveFebruary(false)
                                    setFebruary(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {
                            setActiveMarch(false)  
                            setActiveUserMarch(true)          
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.March')}</div>
                            {march && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveMarch(true)
                                setMarch(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserMarch ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(3))
                              setActiveMarch(false)
                              setMarch(true)
                              setActiveUserMarch(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeMarch ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >

                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveMarch(false)
                                setMarch(true)
                                setActiveUserMarch(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(3)
                                    setActiveMarch(false)
                                    setMarch(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {
         
                            setActiveApril(false)  
                            setActiveUserApril(true) 
                       
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.April')}</div>
                            {april && 
                               <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveApril(true)
                                setApril(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserApril ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(4))
                              setActiveApril(false)
                              setApril(true)
                              setActiveUserApril(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeApril ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                              

                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveApril(false)
                                setApril(true)
                                setActiveUserApril(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(4)
                                    setActiveApril(false)
                                    setApril(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" onClick={() => {
                           
                            setActiveMay(false)  
                            setActiveUserMay(true) 
                           
                          }}>
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.May')}</div>
                            {may && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveMay(true)
                                setMay(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserMay ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(5))
                              setActiveMay(false)
                              setMay(true)
                              setActiveUserMay(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeMay ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveMay(false)
                                setMay(true)
                                setActiveUserMay(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(5)
                                    setActiveMay(false)
                                    setMay(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {
                            setActiveJune(false)  
                            setActiveUserJune(true) 
                          
                          }}>
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.June')}</div>
                            {june && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveJune(true)
                                setJune(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserJune ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(6))
                              setActiveJune(false)
                              setJune(true)
                              setActiveUserJune(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeJune ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveJune(false)
                                setJune(true)
                                setActiveUserMay(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(6)
                                    setActiveJune(false)
                                    setJune(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {                
                            setActiveJuly(false)  
                            setActiveUserJuly(true) 
                        
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.July')}</div>
                            {july && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveJuly(true)
                                setJuly(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserJuly ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(7))
                              setActiveJuly(false)
                              setJuly(true)
                              setActiveUserJuly(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeJuly ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveJuly(false)
                                setJuly(true)
                                setActiveUserJuly(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(7)
                                    setActiveJuly(false)
                                    setJuly(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {
                            setActiveAugust(false)  
                            setActiveUserAugust(true) 
                           
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.August')}</div>
                            {august && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                               
                                setActiveAugust(true)
                                setAugust(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserAugust ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(8))
                              setActiveAugust(false)
                              setAugust(true)
                              setActiveUserAugust(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeAugust ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveAugust(false)
                                setAugust(true)
                                setActiveUserAugust(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(8)
                                    setActiveAugust(false)
                                    setAugust(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {
                            
                            setActiveSeptember(false)  
                            setActiveUserSeptember(true) 
                     
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.Seprember')}</div>
                            {september && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveSeptember(true)
                                setSeptember(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserSeptember ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(9))
                              setActiveSeptember(false)
                              setSeptember(true)
                              setActiveUserSeptember(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeSeptember ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveSeptember(false)
                                setSeptember(true)
                                setActiveUserSeptember(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(9)
                                    setActiveSeptember(false)
                                    setSeptember(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {
                            setActiveOctober(false)  
                            setActiveUserOctober(true) 
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.October')}</div>
                            {october && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveOctober(true)
                                setOctober(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserOctober ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(10))
                              setActiveOctober(false)
                              setOctober(true)
                              setActiveUserOctober(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeOctober ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveOctober(false)
                                setOctober(true)
                                setActiveUserOctober(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(10)
                                    setActiveOctober(false)
                                    setOctober(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" onClick={() => {
                          setActiveNovember(false)  
                          setActiveUserNovember(true) 
                         
                        }}>
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.November')}</div>
                            {november && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveNovember(true)
                                setNovember(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserNovember ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(11))
                              setActiveNovember(false)
                              setNovember(true)
                              setActiveUserNovember(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeNovember ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveNovember(false)
                                setNovember(true)
                                setActiveUserNovember(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(11)
                                    setActiveNovember(false)
                                    setNovember(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                        <li className="calendar__item bg-white cursor-pointer relative" 
                          onClick={() => {
                            setActiveDecember(false)  
                            setActiveUserDecember(true) 
                        
                          }}
                        >
                            <div className="calendar__item__title text-normal font-medium bg-gray-1 text-center">{t('userSubscriptions.December')}</div>
                            {december && 
                              <div className="payment sub absolute" onClick={(event) => {
                                event.stopPropagation()
                                setActiveDecember(true)
                                setDecember(false)
                              }}>
                                <div className="payment__content">
                                  <div className="payment__title text-sm font-bold ">{payment.title}</div>
                                  <div className="payment__user text-xs font-semibold text-blue-1">{payment.user}</div>
                                </div>
                              </div>
                            }
                            {
                            activeUserDecember ? 
                            <div className="payment__settings user flex items-center absolute"
                            onClick={(event) => event.stopPropagation()}
                           >
                           <div className="payment__users flex flex-col">
                            {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                              createBasket(item.userId,getCurrentDate(12))
                              setActiveDecember(false)
                              setDecember(true)
                              setActiveUserDecember(false) 
                            }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}
                            
                           </div>
                          </div>: null
                            } 
                            {activeDecember ? 
                                 <div className="payment__settings flex items-center absolute"
                                  onClick={(event) => event.stopPropagation()}
                                 >
                                 <div className="payment__users flex flex-col">
                                 {connectUsers.map(item => <span className='text-normal font-semibold' onClick={() => {
                                createBasket(item.userId,getCurrentDate(2))
                                setActiveDecember(false)
                                setDecember(true)
                                setActiveUserDecember(false) 
                              }}>{item.role === 'user' ? "Користувач" : "Служник"}</span>)}                
                                 </div>
                                 <div className="payment__delete" onClick={() => {
                                    deleteDateFromBasket(12)
                                    setActiveDecember(false)
                                    setDecember(false)
                                  }}>
                                     <img src={Trash} alt="" />
                                 </div>
                               </div>: null
                            }    
                        </li>
                    </ul>
                </div>
                <div className="subscriptions__buttons flex items-center justify-end">
                  <button className="subscriptions__button text-sm font-semibold" onClick={() => clearBusket()}>{t('userSubscriptions.subscriptions_btn_one')}</button>
                  <button 
                    onClick={() => {
                      postBasket()
                      navigate('/orders')
                    }} className={`subscriptions__button text-sm font-semibold bg-yellow-5 }`}>{t('userSubscriptions.subscriptions_btn_two')}</button>
                </div>
        </div>
    )
}
export default chickenNuggets