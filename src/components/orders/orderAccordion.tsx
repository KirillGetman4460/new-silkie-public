import {useRef,useEffect} from "react";
import { NavLink } from "react-router-dom";
import EditIcon from '../../icons/ep_edit.svg'
import Trash from '../../icons/carbon_trash-can.svg'
interface PropsAccordion{
    index?: number,
    selectedItem?:any,
    handleClick?:any,
    item?:any,
    clearBusket?:any
}

const orderAccordion = ({index,selectedItem,item,clearBusket}:PropsAccordion) =>{
    const contentRef = useRef<any>(null);

    useEffect(() => {
        contentRef.current.style.height = selectedItem === index ? `${contentRef.current.scrollHeight}px` : '0px';
    }, [selectedItem]);
    
    return (
        <div className={`row__body z-10 w-full max-w-full ${selectedItem === index ? 'open' : 'closed'}`} ref={contentRef}>
            <div className="accordion__content flex items-center">
                <div className="payment__content">
                    <div className="payment__content__left flex items-center">
                        <div className="payment__title font-bold text-xs text-black-3">Передплати Chicken Nuggets</div>
                        <div className="payment__text md:text-sm text-xs">{item.chickenNuggetsDates.length}</div>
                        <NavLink to={`/users/${item.userId}/subscriptions/chicken-nuggets`}>
                        <button className="payment__edit__btn"><img src={EditIcon} alt="" /></button>
                        </NavLink>             
                    </div>

                    <div className="payment__content__right flex items-center">
                        <div className="payment__title font-bold text-xs text-black-3">Передплати Canja de Galinha</div>
                        <div className="payment__text md:text-sm text-xs">{0}</div>
                        <button className="payment__edit__btn"><img src={EditIcon} alt="" /></button>
                    </div>
                </div>
                <button onClick={() => clearBusket()} className="payment__btn__delete"><img src={Trash} alt="" /></button>  
            </div>
        </div>
    )
}
export default orderAccordion