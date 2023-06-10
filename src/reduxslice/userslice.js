import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    loginstatus: '',
    username: sessionStorage.getItem('username') || '',
    isLoggedIn: !!sessionStorage.getItem('username'),
    user: {'username':'', 'email':'', role:'', id:0}
}

export const loginUser = createAsyncThunk('login/User',async(user)=>{
    console.log(user, 'logging in')
    let response = await fetch(`http://localhost:3000/users?username=${user.username}`)
    let fetchuser = await response.json()
    console.log(fetchuser)
    if(fetchuser.length > 0 && fetchuser[0].password === user.password)
        return Promise.resolve(fetchuser[0].username)
    return Promise.reject('error')
})

const userslice = createSlice({
    name:'userslice',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
        .addCase(loginUser.fulfilled,(state, action)=>{
            state.loginstatus = 'success';
            state.username = action.payload
            state.isLoggedIn= true
            sessionStorage.setItem('username', state.username)
            console.log(state.loginstatus)
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.loginstatus = 'failure';
            state.username = ''
            state.isLoggedIn= false
            console.log(state.loginstatus)
        })
    }
})

export default userslice.reducer;