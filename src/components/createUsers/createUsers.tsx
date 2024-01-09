import Book from '../../icons/fluent_book_yellow-exclamation.svg'
import { NavLink } from "react-router-dom";
import './createUsers.scss'
const createUsers = () =>{
    return(
        <div className="create__user bg-white1">
            <div className="create__user__conteiner flex flex-col items-center justify-center">
                <div className="create__user__content text-center flex flex-col">
                    <div className="create__user__title font-medium text-black-3">Створюйте групу користувачів облікового запису та керуйте їх підписками</div>
                    
                        <button className="create__user__button">
                            <NavLink to={'/users'}>
                            <span className='text-sm bg-yellow-5 text-white1 font-semibold'>Користувачі облікового запису</span>
                            </NavLink>
                        </button>
                   
                    
                </div>
                <div className="mark">
                <div className="mark__conteiner flex items-center justify-between">
                    <img src={Book} alt="" />
                    <div className="mark__text text-sm font-normal text-black-3">
                        Ви підключені на послугу <a className='text-yellow-5'>Chicken Nuggets</a>. За день до спливу передплати ми надішлемо Вам сповіщення на електронну адресу. Керуйте передплатами з <a className='text-yellow-5'>Платіжного профілю</a>
                    </div>
                    <button className="mark__button text-sm font-semibold text-black-2">
                        Платіжний профіль
                    </button>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default createUsers