// @ts-nocheck
import {useRef,useEffect} from "react";
import { useMediaQuery } from 'react-responsive'
interface PropsAccordion{
    index?: number,
    selectedItem?:any,
    handleClick?:any,
    item?:any
}

const accordion = ({index,selectedItem,item}:PropsAccordion) =>{
    const contentRef = useRef<any>(null);

    const isIpad = useMediaQuery({
        query: '(max-width: 768px)'
    })

    useEffect(() => {
        contentRef.current.style.height = selectedItem === index ? `${contentRef.current.scrollHeight}px` : '0px';
    }, [selectedItem]);
    return (
        <div className={`row__body z-10 w-full max-w-full ${selectedItem === index ? 'open' : 'closed'}`} ref={contentRef}>
            <div className="accordion__content__translation flex flex-col items-center">
                <ul className="accordion__list flex items-center justify-between w-full">
                    {item &&
                        item.map(user => (
                            <>
                             <li className="accordion__list__item text-sm font-normal">{user.firstName}</li>
                        <li className="accordion__list__item text-sm font-normal">
                            <span>
                                {!isIpad ? 'Chicken Nuggets': 'CN'}                     
                            </span>
                            <span>{user.chickenNuggetsDates.length}</span>
                        </li>
                        <li className="accordion__list__item text-sm font-normal">
                            <span>
                                {!isIpad ? 'Canja de Galinha': 'CG'}
                            </span>
                            <span>{user.canjaDeGalinhaDates.length}</span>
                        </li>
                        <li className="accordion__list__item text-sm font-normal">
                            <span>{user.price} </span>
                            <span>USD</span>
                        </li>
                            </>
                        ))
                    }
                   
                   
                </ul>         
            </div>
        </div>
    )
}
export default accordion