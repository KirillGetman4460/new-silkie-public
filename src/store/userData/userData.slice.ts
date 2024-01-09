import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDataState {
    id: string;
    email: string;
    role:string,
    firstName: string;
    lastName: string;
    currentCurrency: string;
    currentLang: string;
    connectUsers: [];
}

const initialState: UserDataState = {
    id: '',
    email: '',
    role:'',
    firstName: '',
    lastName: '',
    currentCurrency: '',
    currentLang: '',
    connectUsers: [],
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
        setCurrentCurrency: (state, action: PayloadAction<string>) => {
            state.currentCurrency = action.payload;
        },
        setCurrentLang: (state, action: PayloadAction<string>) => {
            state.currentLang = action.payload;
        },
        setConnectUsers: (state, action: PayloadAction<[]>) => {
            state.connectUsers = action.payload;
        },
    },
});

export const {
    setId,
    setEmail,
    setFirstName,
    setLastName,
    setCurrentCurrency,
    setCurrentLang,
    setConnectUsers,
    setRole
} = userDataSlice.actions;

export default userDataSlice.reducer;