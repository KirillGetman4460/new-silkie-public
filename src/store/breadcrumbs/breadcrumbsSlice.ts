import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface BreadcrumbsState {
  title: string,
}

const initialState: BreadcrumbsState = {
  title: '',
}

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    selectTitle: (state, action: PayloadAction<string>) =>{
      state.title = action.payload
    }
  },
})

export const { selectTitle} = breadcrumbsSlice.actions

export default breadcrumbsSlice.reducer