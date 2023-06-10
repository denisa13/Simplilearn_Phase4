import React, { useEffect, useState } from 'react';
import { addEvent } from '../reduxslice/eventslice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialState = {
    "eventname": "",
    "date": "",
    "region": "",
    "description": "",
    "imageurl": ""
}

export default function AddEvent() {

    const [myEvent, setMyEvent] = useState(initialState)
    const [error, setError] = useState()
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let status = useSelector((state)=> state.eventreducer.addStatus)
  
    useEffect(()=>{
      if(status === 'success'){
        alert('Adding successful')
        navigate('/')
      }
        
    },[status])
    const handleSubmit = (event)=>{
      event.preventDefault();
      dispatch(addEvent(myEvent))
  
    }

    return (
        <div className="container">

            <h1>Add new event</h1>
            {/* <p style={{ color: 'red' }}>{error && error}</p> */}
            <form>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Event Name
                    </label> <input type="text" className="form-control"
                        name="eventname" value={myEvent.eventname} onChange={(event) => setMyEvent({ ...myEvent, [event.target.name]: event.target.value })}
                        id="formGroupExampleInput2" placeholder="Event name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Date
                    </label> <input type="text" className="form-control"
                        name="date" value={myEvent.date} onChange={(event) => setMyEvent({ ...myEvent, [event.target.name]: event.target.value })}
                        id="formGroupExampleInput2" placeholder="Date" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Region
                    </label> <input type="text" className="form-control"
                        name="region" value={myEvent.region} onChange={(event) => setMyEvent({ ...myEvent, [event.target.name]: event.target.value })}
                        id="formGroupExampleInput2" placeholder="Region" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Description
                    </label> <input type="text" className="form-control"
                        name="description" value={myEvent.description} onChange={(event) => setMyEvent({ ...myEvent, [event.target.name]: event.target.value })}
                        id="formGroupExampleInput2" placeholder="Description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Image url
                    </label> <input type="text" className="form-control"
                        name="imageurl" value={myEvent.imageurl} onChange={(event) => setMyEvent({ ...myEvent, [event.target.name]: event.target.value })}
                        id="formGroupExampleInput2" placeholder="Image url" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add</button>
            </form>
        </div>
    )
}