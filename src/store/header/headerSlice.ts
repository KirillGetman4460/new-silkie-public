import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface HeaderState {
  title: string,
  lang: string,
  valut: string,
  menuActive: boolean,
  titleRoute: string
}

const initialState: HeaderState = {
  title: '',
  lang: localStorage.getItem('lng') || 'UA',
  valut: localStorage.getItem('valut') || 'UAH',
  menuActive:false,
  titleRoute:''
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    selectTitle: (state, action: PayloadAction<string>) =>{
      state.title = action.payload
    },
    selectLang: (state, action: PayloadAction<string>) =>{
      state.lang = action.payload
    },
    selectValut: (state, action: PayloadAction<string>) =>{
      state.valut = action.payload
    },
    setMenuActive:(state, action: PayloadAction<boolean>) =>{
      state.menuActive = action.payload
    },
    setTitleRoute:(state, action: PayloadAction<string>) =>{
      state.titleRoute = action.payload
    }
  },
})

export const { selectTitle,selectLang,selectValut,setMenuActive,setTitleRoute } = headerSlice.actions

export default headerSlice.reducer