
interface Props{
    color?: number
}
const BriefCase = ({color}:Props) =>{
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill={`${color === 3 ? "#fff" : '#1D2122'}`} xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99913 3.24349C9.57 3.24349 9.15844 3.41396 8.85499 3.71741C8.55155 4.02085 8.38108 4.43241 8.38108 4.86155V5.36849H11.6172V4.86155C11.6172 4.43241 11.4467 4.02085 11.1433 3.71741C10.8398 3.41396 10.4283 3.24349 9.99913 3.24349ZM12.8255 5.36849V4.86155C12.8255 4.11194 12.5277 3.39304 11.9977 2.86299C11.4676 2.33294 10.7487 2.03516 9.99913 2.03516C9.24953 2.03516 8.53062 2.33294 8.00057 2.86299C7.47052 3.39304 7.17274 4.11194 7.17274 4.86155V5.36849H3.33247C2.87755 5.36849 2.44126 5.54921 2.11958 5.87088C1.7979 6.19256 1.61719 6.62885 1.61719 7.08377V17.0838C1.61719 17.5387 1.7979 17.975 2.11958 18.2967C2.44126 18.6183 2.87755 18.799 3.33247 18.799H16.6658C17.1207 18.799 17.557 18.6183 17.8787 18.2967C18.2004 17.975 18.3811 17.5387 18.3811 17.0838V7.08377C18.3811 6.62885 18.2004 6.19256 17.8787 5.87088C17.557 5.54921 17.1207 5.36849 16.6658 5.36849H12.8255ZM3.33247 6.57682C3.19802 6.57682 3.06907 6.63023 2.974 6.7253C2.87893 6.82037 2.82552 6.94932 2.82552 7.08377V14.2574H17.1727V7.08377C17.1727 6.94932 17.1193 6.82037 17.0243 6.7253C16.9292 6.63023 16.8002 6.57682 16.6658 6.57682H3.33247ZM17.1727 15.4657H2.82552V17.0838C2.82552 17.2182 2.87893 17.3472 2.974 17.4422C3.06907 17.5373 3.19802 17.5907 3.33247 17.5907H16.6658C16.8002 17.5907 16.9292 17.5373 17.0243 17.4422C17.1193 17.3472 17.1727 17.2182 17.1727 17.0838V15.4657Z" fill={`${color === 3 ? "#fff" : '#1D2122'}`}/>
        </svg>
    )
}
export default BriefCase