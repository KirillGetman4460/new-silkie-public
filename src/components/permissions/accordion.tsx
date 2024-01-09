// @ts-nocheck
import {useRef,useEffect} from "react";
interface PropsAccordion{
    index?: number,
    selectedItem?:any,
    item?:any,
    handleCheckboxChange?:any,
    category?:string,
    switchNotification?:string
}

const accordion = ({index,selectedItem,item,handleCheckboxChange,category,switchNotification}:PropsAccordion) =>{
    const contentRef = useRef<any>(null);
    

    useEffect(() => {
        contentRef.current.style.height = selectedItem === index ? `${contentRef.current.scrollHeight}px` : '0px';
    }, [selectedItem]);
    return (
        <div className={`row__body z-10 w-full max-w-full ${selectedItem === index ? 'open' : 'closed'}`} ref={contentRef}>
            <div className="accordion__content__translation notifications flex flex-col items-center">
                <ul className="accordion__list notifications  flex items-center justify-between w-full relative">
                {Object.values(item).some(value => typeof value === 'object' && value !== null) ?
                    Object.keys(item).map(key => (
                        <div key={key} className="checkbox__pay">
                          <div className="cell text-center">
                            <label className="accordion__label pr-6 text-sx font-normal">Email</label>
                            <input
                              type="checkbox"
                              checked={item[switchNotification].email}
                              onChange={() => handleCheckboxChange(category, switchNotification, 'email')}
                              className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`}
                            />
                          </div>
                          <div className="cell text-center">
                          <label className="accordion__label pr-6 text-sx font-normal">Telegram</label>
                            <input
                              type="checkbox"
                              checked={item[switchNotification].telegram}
                              onChange={() => handleCheckboxChange(category, switchNotification, 'telegram')}
                              className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`}
                            />
                          </div>
                          <div className="cell text-center">
                          <label className="accordion__label pr-6 text-sx font-normal">Whatsapp</label>
                            <input
                              type="checkbox"
                              checked={item[switchNotification].whatsapp}
                              onChange={() => handleCheckboxChange(category, switchNotification, 'whatsapp')}
                              className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`}
                            />
                          </div>
                        </div>
                      )):
                      Object.keys(item).map(key => (
                        <div className="cell text-center" key={key}> 
                            <label className="accordion__label pr-6 text-sx font-normal">{key === 'owner' ? 'Власник' : key === 'organizer' ? "Привідець" : key === "reader" ? "Щитач": key === 'user' ? 'Користувач' :''}</label>
                            <input type="checkbox" onChange={() => handleCheckboxChange(category, key)} checked={item[key]} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
                        </div>
                    ))
                }
                
                </ul>        
            </div>
        </div>
    )
}
export default accordion