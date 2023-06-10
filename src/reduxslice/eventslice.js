import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';

const initialState = {
    events:[],
    status:"idle",
    error:'',
    myEvent:{'eventname':'','date':'', 'region':'','description':'','imageurl':'', id:0},
    addStatus:'failure',
    deleteStatus:''
}

export const fetchEvents = createAsyncThunk('fetch/Events',async()=>{
    let response = await fetch('http://localhost:3000/events')
return response.json()
})

export const addEvent = createAsyncThunk('add/event', async(myEvent)=>{
   let response =  await fetch(`http://localhost:3000/events`,{
        method:'POST',
        body: JSON.stringify(myEvent),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    let data = await response.json();
    if(data !== null || data !== undefined)
        return Promise.resolve('success')
    return Promise.reject('failure')
})

export const deleteEvent = createAsyncThunk('delete/event', async(id)=>{
    await fetch(`http://localhost:3000/events/${id}`,{
         method:'DELETE',
         body: JSON.stringify(id),
         headers:{
             'Content-Type' : 'application/json'
         }
     })
     console.log(id)
     return id
    //  console.log('id', id)
    //  let data = await response.json();
    //  if(data !== null || data !== undefined)
    //      return Promise.resolve('success')
    //  return Promise.reject('failure')
 })

 const eventsAdapter = createEntityAdapter({
    selectId: (myEvent) => myEvent.id,
 })

const eventslice = createSlice({
    name:"eventslice",
    initialState, 
    reducers:{
    },
    extraReducers(builder){
        builder.addCase(fetchEvents.pending, (state, action)=>{
            state.status='loading'
        })
        builder.addCase(fetchEvents.fulfilled, (state, action)=>{
            state.status = 'success';
            state.events = state.events.concat(action.payload)
        })
        builder.addCase(fetchEvents.rejected, (state, action)=>{
            state.status='error'
        })

        builder.addCase(addEvent.fulfilled, (state, action)=>{
            state.addStatus='success';
            state.events = state.events.concat(action.payload)
            console.log(state.addStatus)
        })
        builder.addCase(addEvent.rejected,(state, action)=>{
            state.addStatus = 'failure';
            console.log(state.addStatus)
        })

        builder.addCase(deleteEvent.fulfilled, (state, {payload: id})=>{
            state.deleteStatus='success';
            eventsAdapter.removeOne(state, id)
            console.log(state.deleteStatus)
            console.log(id)
        })
        builder.addCase(deleteEvent.rejected,(state, action)=>{
            state.deleteStatus = 'failure';
            console.log(state.deleteStatus)
        })
    }
})


export default eventslice.reducer;