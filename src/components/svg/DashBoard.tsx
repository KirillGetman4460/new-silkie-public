const DashBoard = ({color}:any) =>{ 
        return(
            <svg width="20" height="20" viewBox="0 0 20 20" fill={`${color === 0 ? "#fff" : '#1D2122'}`} xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 12.5V13.75H5.36625L1.25 17.8663L2.13375 18.75L6.25 14.6337V17.5H7.5V12.5H2.5ZM15 13.125H16.25V16.25H15V13.125ZM12.5 10H13.75V16.25H12.5V10ZM10 11.25H11.25V16.25H10V11.25Z" fill={`${color === 0 ? "#fff" : '#1D2122'}`}/>
                <path d="M17.5 1.25H2.5C2.16858 1.25033 1.85083 1.38213 1.61648 1.61648C1.38213 1.85083 1.25033 2.16858 1.25 2.5V10H2.5V8.125H17.5006L17.5013 17.5H10V18.75H17.5C17.8314 18.7495 18.149 18.6176 18.3833 18.3833C18.6176 18.149 18.7495 17.8314 18.75 17.5V2.5C18.7497 2.16858 18.6179 1.85083 18.3835 1.61648C18.1492 1.38213 17.8314 1.25033 17.5 1.25ZM7.5 6.875H2.5V2.5H7.5V6.875ZM8.75 6.875V2.5H17.5V6.875H8.75Z" fill={`${color === 0 ? "#fff" : '#1D2122'}`}/>
            </svg>
        )
}
export default DashBoard