interface PropsButton{
    children?: any,
    bg: string,
    type?: any,
    onSubmit?: any
}
const button = ({children,bg,type,onSubmit}:PropsButton) =>{    
    return (
        <>
            <button onClick={() => onSubmit()} type={type} className={`${bg} text-white1 text-sm font-normal w-full py-3 mt-5 uppercase`}>{children}</button>
        </>
    )
} 
export default button