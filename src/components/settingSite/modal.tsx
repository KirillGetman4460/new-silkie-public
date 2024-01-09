import { useState } from "react"
import {useAppDispatch} from '../../store/hooks/hooks.ts'
import {selectLang,selectValut} from '../../store/header/headerSlice.ts'
import { useTranslation } from 'react-i18next';
import DropDownSelect from "../../ui/dropDownSelect.tsx";
// import conversion from '../../helper/conversion.ts'
import CloseIcon from '../svg/CloseModal'
import './settingSite.scss'


interface ModalProps {
    active?:any
}

const Modal = ({active}:ModalProps) =>{

    const [langOption] = useState<any>(['Українська','Англійська'])
    const [langOptionEn] = useState<any>(['Ukrainian','English'])

    const [valutaOption] = useState<any>(['USD','UAH','EUR'])
    
    const[langSelect,setLangSelect] = useState<any>(localStorage.getItem('lng') === 'ua' ? "Українська" : localStorage.getItem('lng') === 'en' ? "English" : '')
    const[valutaSelect,setValutaSelect] = useState<any>(localStorage.getItem('valut') ? localStorage.getItem('valut'): "UAH")

    const dispatch = useAppDispatch()

    const {i18n} = useTranslation();

    const { t } = useTranslation();

    const saveChange = () => {   
        i18n.changeLanguage(langSelect === 'Українська' || langSelect === 'Ukrainian' ? 'ua' : 'en')
        dispatch(selectLang(langSelect))
        dispatch(selectValut(valutaSelect))
        
        localStorage.setItem("lng", langSelect === 'Українська' || langSelect === 'Ukrainian' ? 'ua' : 'en');
        localStorage.setItem("valut", valutaSelect);            
    }

    const selectOptionLang = (lang:string) => setLangSelect(lang)
    const selectOptionValut = (val:string) => setValutaSelect(val)

    // const [valutCurret,setValutCurrent] = useState<any>([])

    // useEffect(() =>{
        
    //     conversion()
    //         .then(res => setValutCurrent([res.data]))  
    // },[])
    
    
    // valutCurret.map(item =>{
    //     console.log(item[0].ADA);
        
    // })
    return (
        <dialog id="my_modal_3" className="modal  bg-overlay bg-opacity-10 p-0" ref={active}>
        <div className="modal-box bg-white1 rounded-none ">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><CloseIcon></CloseIcon></button>
            </form>
            <div className="modal__title font-semibold text-black-3 text-lg">{t('settingSite.title')}</div>
            <div className="modal__selects">           
                <DropDownSelect 
                    title={t('settingSite.select_lang')}  
                    option={localStorage.getItem('lng') === 'ua' ? langOption : langOptionEn} 
                    select={selectOptionLang} 
                    langSelect={langSelect}         
                />
                <DropDownSelect 
                    title={t('settingSite.select_val')}  
                    option={valutaOption} 
                    select={selectOptionValut} 
                    langSelect={valutaSelect}    
                />
            </div>
            <form method="dialog">
                <button 
                    className="modal__button__save bg-yellow-5 text-white1 font-semibold text-sm w-full"
                    onClick={() => saveChange()}
                >{t('settingSite.btn')}</button>
            </form>
        </div>
        </dialog>
    )
}
export default Modal