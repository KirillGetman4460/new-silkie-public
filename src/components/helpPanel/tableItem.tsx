import {useRef,useEffect,useState} from "react";
import Arrow from '../../icons/ep_arrow-down.svg'
// import { Link } from "react-router-dom";
import {useAppSelector} from '../../store/hooks/hooks.ts'
import { useMediaQuery } from 'react-responsive'
interface TableProps {
  index : number,
  item: any,
  handleClick: any,
  selectedItem : any
}

const TableItem = ({index,item,handleClick,selectedItem}:TableProps) =>{
    const contentRef = useRef<any>(null);

    const [itemValue,setItemValue] = useState<number>(item.quantity)
    const {valut} = useAppSelector(state => state.header)

    const isMobileIpad = useMediaQuery({
      query: '(max-width: 767px)'
    })
    // const isMobileSmall = useMediaQuery({
    //   query: '(max-width: 575px)'
    // })
    const [additional] = useState([
      {
        name:"Ім'я користувача 1",
        payment1:true,
        payment2:false
      },
      {
        name:"Ім'я користувача 2",
        payment1:true,
        payment2:false
      },
      {
        name:"Ім'я користувача 3",
        payment1:true,
        payment2:false
      },
      {
        name:"Ім'я користувача 4",
        payment1:true,
        payment2:false
      },
      {
        name:"Ім'я користувача 5",
        payment1:true,
        payment2:false
      }

    ])

    const handleInputChange = (event:any) => setItemValue(event.target.value);

    useEffect(() => {
        contentRef.current.style.height = selectedItem === index ? `${contentRef.current.scrollHeight}px` : '0px';
    }, [selectedItem]);
   
    return(
      <>
                <div className={`row relative md:text-sm text-xs text-black-3 font-normal text-center  ${selectedItem === index ? 'selected hover:outline-none' : ''}`}
                  onClick={() => {
                    handleClick(index,item.name)
                  }}        
                >   
                  <div className="cell item">{item.name}</div>              
                    <div className="cell item">
                        <input type="text" className="text-center bg-transparent focus:outline-none" 
                          value={itemValue}
                          onChange={handleInputChange}
                          onClick={(event) => event.stopPropagation()}
                        />    
                    </div> 
                        <div className="cell item text-center"> 
                            <div className="payment flex items-center justify-center ">
                               <div className={`active__icon  ${item.payment ? 'bg-yellow-5' : 'bg-black-1'}`}></div> 
                               <div className="cell__text">{item.payment ? 'Активна' : 'Не активна'}</div>
                             </div>      
                           </div>                      
                           <div className="cell item text-center"> 
                             <div className="payment flex items-center justify-center ">
                               <div className={`active__icon  ${item.payment2 ? ' bg-yellow-5' : 'bg-black-1 '}`}></div> 
                               <div className="cell__text">{item.payment2 ? 'Активна' : 'Не активна'}</div>
                             </div>      
                           </div> 
                          <div className="cell item">{item.date}</div> 
                          <div className="cell item">{valut === 'USD' ? 10 : valut === 'UAH' ? 365 : 10} {valut}</div> 
                          <div className={`row__arrow__icon absolute ${selectedItem === index ? 'active' : ''}`}>
                            <img src={Arrow} alt="" />
                          </div>
                      </div> 

                      <div ref={contentRef} className={`row__body z-10 w-full max-w-full ${selectedItem === index ? 'open' : 'closed'}`}>
                          <ul className="additional_information__list">
                              {additional.map(el => 
                                <li className="additional_information__item flex flex-row">
                                  <div className="additional_information__name font-normal text-black-3 ipad:text-sm text-xs">{el.name}</div>
                                  <div className="payment flex">
                                  <div className="additional_information__payment bg-gray-2 flex items-center">
                                    <div className="payment__left">
                                      <div className="payment__title text-sm text-black-3 font-bold  text-left">{!isMobileIpad ? "Chicken Nuggets" : 'CN'}</div>
                                      <div className="payment__user text-left text-blue-1 font-semibold text-xs">Користувач</div>
                                    </div>
                                    <div className="payment__right">
                                      <div className="payment__prepayment text-black-2 text-xs font-bold">Передплат: 5</div>
                                      <div className="payment__date text-black-3 text-sm font-normal">15/12/2024</div>
                                    </div>
                                  </div>  

                                  <div className="additional_information__payment bg-gray-2 flex items-center">
                                    <div className="payment__left">
                                      <div className="payment__title text-sm text-black-3 font-bold text-left">{!isMobileIpad ? 'Canja de Galinha' : 'CG'}</div>
                                      <div className="payment__user text-left text-blue-1 font-semibold text-xs">Користувач</div>
                                    </div>
                                    <div className="payment__right">
                                      <div className="payment__prepayment text-black-2 text-xs font-bold">Передплат: 1</div>
                                      <div className="payment__date text-black-3 text-sm font-normal">15/12/2024</div>
                                    </div>
                                  </div>  
                                  </div>
                          

                                </li>
                              )}
                          </ul>                       
                      </div> 

      </>
            
    )
}
export default TableItem  