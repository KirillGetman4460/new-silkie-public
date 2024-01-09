// import { NavLink } from "react-router-dom";
const recurringPayments = () =>{
    return (
        <div className="payment__profile w-full">
            <div className="payment__profile__conteiner one">
                <div className="payment__content w-full bg-white1">
                {/* <div className="paymemt__title font-semibold text-lg pb-6">Налаштування платежу</div>
                    <form className="form__payment settings flex flex-col w-full gap-4 mb-20">
                        <label htmlFor="" className='flex justify-start items-center gap-4 '>
                            <span className='text-sm text-black-3 text-right whitespace-nowrap'>Вибір платежу:</span>
                            <input type="text" name="card_name" className='form__input input__name bg-gray-1 focus:outline-none pl-4'/>
                        </label>
                        <div className="checkboxs flex items-center gap-4 justify-start pb-8">
                            <label htmlFor="" className="checkbox__label flex items-center">
                                <Checkbox></Checkbox>
                                <span className='text-sm pl-3'>Автоплатіж</span>
                            </label>
                            <label htmlFor="" className="checkbox__label flex items-center">
                                <Checkbox></Checkbox>
                                <span className='text-sm pl-3'>Нагадування</span>
                            </label>
                        </div>
                        <div className="form__bottom flex flex-row justify-between flex-wrap w-full gap-4">
                            <label htmlFor="" className='flex justify-end items-center pl-4 gap-4 '>
                                <span className='text-sm text-black-3 '>Регулярність:</span>
                                <input type="text" name="card_number" className='form__input w-full bg-gray-1 focus:outline-none pl-4'/>
                            </label>
                            <label htmlFor="" className='pl-6 flex items-center'>
                                <span className='text-sm text-black-3 pr-5'>Сума:</span>
                                <input type="text" className='form__input input__sum bg-gray-1 focus:outline-none pl-4 w-full'/>
                            </label>
                            <label htmlFor="" className='flex items-center'>
                                <span className='text-sm text-black-3 text-right '>Дата наступного списання коштів:</span>
                                <input type="date" name="data" className='form__input input__date bg-gray-1  focus:outline-none w-full pl-4 pr-4'/>
                            </label>
                            
                        </div>               
                    </form> */}                
                    <div className="paymemt__title font-semibold text-lg pb-6">Платіжна карта</div>
                    <form className="form__payment flex flex-col w-full gap-4">
                        <label htmlFor="" className='flex justify-end items-center gap-4'>
                            <span className='text-sm text-black-3 text-right whitespace-nowrap'>Ім’я власника карти:</span>
                            <input type="text" name="card_name" className='form__input input__name border-none bg-gray-1 focus:outline-none pl-4'/>
                        </label>
                        <label htmlFor="" className='flex justify-end items-center gap-4'>
                            <span className='text-sm text-black-3 '>Номер карти:</span>
                            <input type="text" name="card_number" className='form__input input__number border-none bg-gray-1 focus:outline-none pl-4'/>
                        </label>
                        <div className="form__bottom flex justify-end">
                            <label htmlFor="" className='flex items-center gap-4'>
                                <span className='text-sm text-black-3'>Термін дії :</span>
                                <input type="text" name="exp-month" id="exp-month" className='form__input input__date border-none bg-gray-1 mr-3 focus:outline-none pl-4'/>
                                <input type="text" name="exp-year" id="exp-year" className='form__input input__date border-none bg-gray-1 focus:outline-none pl-4'/>
                            </label>
                            <label htmlFor="" className='pl-6'>
                                <span className='text-sm text-black-3 pr-5'>CVV:</span>
                                <input type="text" name="card_cvc" className='form__input  input__cvc bg-gray-1 border-none focus:outline-none pl-4'/>
                            </label>
                        </div>
                        
                    </form>     
                    <div className="payment__btns flex items-center justify-end gap-4 mt-10 py-3.5">
                        <button className="payment__btn"><span className='border border-black-2 font-semibold text-sm text-black-3 py-3.5 px-11'>Сказувати</span></button>
                        <button className="payment__btn"><span className='font-semibold text-sm text-white1 bg-yellow-5 py-3.5 px-11'>Зберегти</span></button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default recurringPayments