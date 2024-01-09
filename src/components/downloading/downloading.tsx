import { useMediaQuery } from 'react-responsive'
import Breadcrumbs from '../breadcrumb/breadcrumb.tsx'
import './downloading.scss'
import './downloadingMedia.scss'
const downloading = () =>{
    const isIpad = useMediaQuery({
        query: '(max-width: 768px)'
    })
    return(
        <div className="downloading w-full">
            {isIpad ? 
              <div className="header__title__page text-sx font-semibold flex items-center overflow-x-auto bg-gray-1">
                <Breadcrumbs/>
              </div>
            : ''}
            <div className="downloading__conteiner flex justify-center">
                <div className="downloading__block flex flex-col bg-white">
                    <div className="downloading__title text-center font-semibold text-black-3 uppercase">Chicken Nuggets</div>
                    <div className="downloading__text text-center font-bold">Сплачуєте щомісяця фіксовані суми? Налаштуйте автоплатіж.</div>
                    <div className="downloading__instructions__title text-sm font-normal">Як працює автоплатіж:</div>
                    <ul className="instructions__instructions__list flex flex-col">
                        <li className="instructions__list__item text-sm font-normal">Налаштовуєте автоплатіж на доступні шаблони.</li>
                        <li className="instructions__list__item text-sm font-normal">Налаштовуєте параметри: частоту списання, суму та платіжну картку.</li>
                        <li className="instructions__list__item text-sm font-normal">У вибраний день ваш шаблон буде автоматично сплачений.</li>
                    </ul>
                    <button className="instructions__instructions__btn  text-white text-sm font-semibold flex justify-center">
                        <span className='bg-yellow-5'>Завантажити</span>
                    </button>
                </div>
                <div className="downloading__block flex flex-col bg-white">
                    <div className="downloading__title text-center font-semibold text-black-3 uppercase">Chicken Nuggets</div>
                    <div className="downloading__text text-center font-bold">Сплачуєте щомісяця фіксовані суми? Налаштуйте автоплатіж.</div>
                    <div className="downloading__instructions__title text-sm font-normal">Як працює автоплатіж:</div>
                    <ul className="instructions__instructions__list flex flex-col">
                        <li className="instructions__list__item text-sm font-normal">Налаштовуєте автоплатіж на доступні шаблони.</li>
                        <li className="instructions__list__item text-sm font-normal">Налаштовуєте параметри: частоту списання, суму та платіжну картку.</li>
                        <li className="instructions__list__item text-sm font-normal">У вибраний день ваш шаблон буде автоматично сплачений.</li>
                    </ul>
                    <button className="instructions__instructions__btn  text-white text-sm font-semibold flex justify-center">
                        <span className='bg-yellow-5'>Завантажити</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default downloading