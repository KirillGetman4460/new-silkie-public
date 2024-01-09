import { useParams,Outlet,NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./userSubscriptions.scss"
const subscriptions = () =>{

    const {userId} = useParams();

    const { t } = useTranslation();

    return(
        <div className="subscriptions">
            <div className="subscriptions__conteiner">
                <ul className="subscriptions__list flex bg-white1"> 
                        <NavLink 
                            to={`/users/${userId}/subscriptions/chicken-nuggets`}
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >   
                        <li className="subscriptions__list__item bg-gray-2">                   
                            <div className="subscriptions__item__title text-sm text-black-3 font-bold">Chicken Nuggets</div>
                            <div className="subscriptions__item__payment text-black-2 text-xs font-bold">{t('userSubscriptions.subscriptions')}: 0</div>                   
                        </li>
                        </NavLink>          

                    <li className="subscriptions__list__item bg-gray-2">
                        <div className="subscriptions__item__title text-sm text-black-3 font-bold">Canja de Galinha</div>
                        <div className="subscriptions__item__payment text-black-2 text-xs font-bold">{t('userSubscriptions.subscriptions')}: 0</div>
                    </li>
                </ul>
                {/* <div className="subscriptions__text">
                    <div className="subscriptions__title uppercase text-center">
                        перед тим як сформувати передплату, налаштуйте ваш платіжний профіль
                    </div>
                    <button className="subscriptions__btn flex justify-center w-full">
                        <span className="bg-yellow-5 text-white1 text-sm font-semibold">платіжний профіль</span>
                    </button>
                </div> */}
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default subscriptions