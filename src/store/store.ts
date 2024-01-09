import { configureStore } from '@reduxjs/toolkit'
import headerSlice from './header/headerSlice'
import authenticatedSlice from './auth/authenticated'
import userDataSlice from './userData/userData.slice'
import breadcrumbsSlice from './breadcrumbs/breadcrumbsSlice'
export const store = configureStore({
  reducer: {
    header: headerSlice,
    auth: authenticatedSlice,
    userData: userDataSlice,
    breadcrumbs:breadcrumbsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch