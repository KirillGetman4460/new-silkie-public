// import {useState} from "react"
import { NavLink } from "react-router-dom";
import './paymentProfile.scss'
import './paymentProfileMedia.scss'
const paymentProfile = () =>{
    return(
        <div className="payment__profile w-full">
            <div className="payment__profile__conteiner one">
                    <div className="payment__profile__settings flex flex-col">
                    <div className="payment__profile__setting bg-white1 flex items-center justify-between">
                        <div className="profile__setting__title text-lg font-normal text-black-3">
                            Повторювані платежі                           
                        </div>
                        <div className="profile__setting__text text-sm font-normal ">
                            Налаштовуєте автоплатіж на доступні шаблони.
                            Налаштовуєте параметри: частоту списання, суму та платіжну картку. У вибраний день ваш шаблон буде автоматично сплачений.
                        </div>
                        <button className="profile__setting__button bg-yellow-5 text-white1 text-sm">
                            <span>Перейти</span>
                        </button>
                    </div>
                    <div className="payment__profile__setting bg-white1 flex items-center justify-between">
                        <div className="profile__setting__title text-lg font-normal text-black-3">
                            Платежі за налаштуваннями              
                        </div>
                        <div className="profile__setting__text text-sm font-normal ">
                            Вам буде відображена сітка в середині платіжного профілю де Ви зможете вибрати тип оплати.
                        </div>
                        <NavLink to={'/payment-profile/recurring-payments'}>
                            <button className="profile__setting__button bg-yellow-5 text-white1 text-sm">
                                <span>Перейти</span>
                            </button>
                        </NavLink>
                    </div>
                     {/* <form method="post" action="https://wallet.advcash.com/sci/">
         <input type="hidden" name="ac_account_email" value="kirill.demchenko.69@gmail.com" />
         <input type="hidden" name="ac_sci_name" value="silkie" />
         <input type="text" name="ac_amount" value="2.00" />
         <input type="text" name="ac_currency" value="USD" />
         <input type="text" name="ac_order_id" value="123456789" />
         <input type="text" name="ac_sign" value="c6edb505e6cb722ebbe9f970097f7d1cf6baa6f5e3b13fad888031eb78ace8ab" />
         <input type="hidden" name="ac_success_url" value="https://new-silkie.vercel.app" />
         <input type="hidden" name="ac_success_url_method" value="GET" />
         <input type="hidden" name="ac_fail_url" value="https://new-silkie.vercel.app" />
         <input type="hidden" name="ac_fail_url_method" value="GET" />
         <input type="hidden" name="ac_status_url" value="https://new-silkie.vercel.app" />
         <input type="hidden" name="ac_status_url_method" value="GET" />
         <input type="text" name="ac_comments" value="Comment" />
         <input type="submit" />
</form> */}
                    </div>
            </div>
        </div>
    )
}
export default paymentProfile