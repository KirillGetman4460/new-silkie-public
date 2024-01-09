import axios from 'axios'
const KEY = 'cur_live_rWBYYLILrrS7rGrC4ETjfpNG7KB7RP53aehTG0FL'
const conversion = async() =>{
    const { data } = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${KEY}`)
    return data
}

export default conversion