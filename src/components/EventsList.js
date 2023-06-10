import React, { useEffect, useCallback } from 'react'
//import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../reduxslice/eventslice';
import Event from './Event';
import Spinner from './Spinner';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {AddEvent} from './AddEvent'
import { deleteEvent } from "../reduxslice/eventslice";

export default function EventsList() {

  const dispatch = useDispatch()
  const state = useSelector((state) => state.eventreducer)
  const status = state.status;
  const events = state.events;
  let navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.userreducer.isLoggedIn);
  let addStatus = useSelector((state)=> state.eventreducer.addStatus)

  

  let deleteStatus = useSelector((state)=> state.eventreducer.deleteStatus)

  // useEffect(()=>{
  //   if(deleteStatus === 'success'){
  //     alert('Deleting successful')
  //     navigate('/')
  //   }
      
  // },[status])

  // const handleDelete = (event)=>{
  //   // event.preventDefault();
  //   dispatch(deleteEvent(4)) 
  //   console.log('button clicked with id', 4)
  // }

  const navigateToAddEvent= () => {
    navigate('/addEvent');
  };

  const onDelete = useCallback((id)=>{
    dispatch(deleteEvent(id))
    console.log('id from dispatch', id)
  }, [])

  console.log(state)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
    if(addStatus === 'success'){
      window.location.reload();
    }
  }, [])

  let content = ''
  if (status === 'loading') {
    content = <Spinner text="Loading..." />;
  }
  else if (status === 'success') {
    content = (<div className='container'>
      <h3>List Of Upcoming Events</h3>
      {events.map(event =>
         <><Event key={event.id} myEvent={event} onDelete={onDelete} /> </>)} 
     
    </div>
    )
  }

  // useEffect(()=>{
  //   if(status === 'success'){
  //     alert('Deleting successful')
  //     navigate('/')
  //   }
      
  // },[status])

  return (

    
    <div> 
      {content}
      <div className="text-center mb-2">
        {isLoggedIn && <button type="submit" className="btn btn-primary" onClick={navigateToAddEvent}>Add new event </button>}
      </div>
    </div>
  )

}