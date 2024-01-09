// @ts-nocheck
import axios from "axios";
import CsvDownloader from 'react-csv-downloader';
import { useEffect, useState } from 'react';
import { useAppSelector } from "../../store/hooks/hooks.ts";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next';
import Accordion from './accordion'
import { Tooltip } from 'react-tooltip';
import Breadcrumbs from '../breadcrumb/breadcrumb.tsx'
import "./translationHistory.scss"
import "./translationHistoryMedia.scss"
const translationHistory = () => {

    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null);

    const [excelOrdersHistory,setExcelOrdersHistory] = useState<any>([]);

    const [loading,setLoading] = useState(false)

    const [orderHistory,setOrderHistory] = useState<any>([])

    const [token] = useState(localStorage.getItem('token'))

    const id = useAppSelector(state => state.userData.id)

    const isIpad = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const getOrderHistory  = async() =>{  
        const res = await axios.get(`${process.env.REACT_APP_SERVER}payment/history`,{params:{userId:id},
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


    useEffect(() =>{
        getOrderHistory()
            .then(res => {
                if(res.code !== 200){
                    setLoading(true)
                }
                setOrderHistory(res.data)                
            })
    },[])

    useEffect(() =>{
        orderHistory.map(item => {
            item.basket.map(user =>{
                setExcelOrdersHistory([
                    ...excelOrdersHistory,
                    {
                        name:user.firstName,
                        chickenNuggetsDates: user.chickenNuggetsDates.length,
                        canjaDeGalinhaDates: user.canjaDeGalinhaDates.length,
                        price: user.price

                    }
                ])          
            })
        })
    },[orderHistory.length])
    
    return(
        <div className="translation__history bg-white1 w-full">      
            {isIpad ? 
              <div className="header__title__page text-sx font-semibold flex items-center overflow-x-auto bg-gray-1">
                <Breadcrumbs/>
              </div>
            : ''}

            <div className="translation__history__conteiner">
                <div className="translation__history__table border border-gray-2">
                    <div className="translation__history__table__title flex bg-gray-2 w-full justify-between border-b border-gray-2">
                        <div className="table__title__text text-black-3 text-sm font-bold">{t('translation_history.date')}</div>
                        <div className="table__title__text text-black-3 text-sm font-bold">{t('translation_history.total_price')}</div>
                    </div>
                    {orderHistory.map((item,i) => 
                    <>
                    <div className={`translation__history__table__row rounded-none border-b border-gray-2 relative cursor-pointer ${selectedItem === i ? 'selected hover:outline-none' : ''}`} key={i} onClick={() => handleClick(i)}>                 
                         <div className="collapse__text__content flex justify-between relative">
                         <div className="collapse__date flex items-center text-sm text-black-3 font-normal">
                             <span>{item.date}</span>
                             <div className={`collapse__data__icon ${selectedItem === i ? 'rotate-180' : ''}`}>
                                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M0.783299 0.116955L5.04836 4.27449L9.31342 0.116955C9.38962 0.0425232 9.49192 0.000853336 9.59844 0.000853327C9.70496 0.000853317 9.80726 0.0425232 9.88346 0.116955C9.92036 0.153106 9.94967 0.196257 9.96968 0.243879C9.98969 0.291501 10 0.342638 10 0.394294C10 0.44595 9.98969 0.497087 9.96968 0.544709C9.94967 0.592332 9.92036 0.635482 9.88346 0.671634L5.34618 5.09542C5.2665 5.17309 5.15963 5.21655 5.04836 5.21655C4.93709 5.21655 4.83022 5.17309 4.75054 5.09542L0.21326 0.672489C0.176102 0.63631 0.146568 0.593053 0.126402 0.545273C0.106237 0.497493 0.0958472 0.446157 0.0958472 0.394295C0.0958472 0.342434 0.106236 0.291097 0.126402 0.243317C0.146568 0.195537 0.176102 0.152281 0.21326 0.116102C0.289462 0.0416703 0.391759 8.39979e-07 0.498281 8.30667e-07C0.604802 8.21354e-07 0.707097 0.0416703 0.783299 0.116102L0.783299 0.116955Z" fill="#1D2122"/>
                                 </svg>
                             </div>
                         </div>
                         <div className="collapse__money text-sm text-black-3 font-normal">
                             <span>{item.totalPrice} USD</span>      
                         </div>
                         </div>
                         
                        <CsvDownloader datas={excelOrdersHistory} filename="translation-history.csv" >
                        <div className="download absolute" onClick={() => handleClick(i)}>
                             <div className='download__icon' data-tooltip-id="my-tooltip" data-tooltip-content="Завантажити в форматі CSV">                    
                                 <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M10.6082 10.6082V12.5369H0.964379V10.6082H0V12.5369C0 12.7927 0.101604 13.038 0.28246 13.2188C0.463316 13.3997 0.70861 13.5013 0.964379 13.5013H10.6082C10.8639 13.5013 11.1092 13.3997 11.2901 13.2188C11.4709 13.038 11.5725 12.7927 11.5725 12.5369V10.6082H10.6082ZM10.6082 5.78627L9.92828 5.10639L6.26846 8.76138V0H5.30408V8.76138L1.64427 5.10639L0.964379 5.78627L5.78627 10.6082L10.6082 5.78627Z" fill="#7E7E7E"/>
                                 </svg>
                             </div>
                             <Tooltip id="my-tooltip" className='tooltip__custom'/>
                         </div>
                        </CsvDownloader>
                                 
                        </div>
                        <Accordion item={item.basket} index={i} selectedItem={selectedItem} handleClick={handleClick}/>
                        
                    </>
                    
                    )}

                </div>
            </div>
        </div>
    )
}
export default translationHistory