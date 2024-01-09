interface Props{
    checked?:any,
    onChange?:any,
}
const Checkbox = ({checked,onChange}:Props) =>{
    return(
        <>
            <input type="checkbox" onChange={() => onChange(checked)} checked={checked} className={`form-checkbox rounded text-yellow-5  h-5 w-5 cursor-pointer`} />
        </>
    )
}
export default Checkbox