import { useState } from "react"
interface Props{
    title:string,
    option: string[],
    select: any,
    langSelect:any,
    idSelect?:any
}

const DropDownSelect = ({title,option,select,langSelect}:Props) =>{

    const [openModal,setOpenModal] = useState<any>(false)
    
    const selectOption = (item:string) =>{
        if (openModal) {
            setOpenModal(false);
        }
        select(item)
        setOpenModal(false)
    }
    return(
        <div className="modal__select w-full no-animation relative">
        <div className="modal__select__title text-black-2 text-xs font-normal">{title}</div>
            <div 
                className="btn justify-between rounded-none bg-white1 border border-gray-2 w-full m-0 hover:bg-white1"
                onClick={() => setOpenModal(!openModal)}
            >
                <span>{langSelect}</span>
                <div className={`${openModal ? 'rotate-180': null}`}>
                    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-2.18557e-07 0L5 5L10 -4.37114e-07L-2.18557e-07 0Z" fill="#7E7E7E"/>
                    </svg>
                </div>
            </div>
            {openModal ?  <ul className="p-0 menu dropdown-content z-[1] bg-gray-1 rounded-none w-full absolute ">
                {option.map(item => 
                    <li>
                        <a className="rounded-none hover:bg-gray-1 hover:text-yellow-5" onClick={() => selectOption(item)}>{item}</a>
                    </li>
                )}
            </ul> : null}                          
        </div>
    )
}
export default DropDownSelect