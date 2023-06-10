import React, { useEffect, useState } from 'react';
import { useParams, createSearchParams, useNavigate} from "react-router-dom";
import { deleteEvent } from "../reduxslice/eventslice";
import { useSelector, useDispatch } from 'react-redux';


export default function Event({myEvent, onDelete}) {

    const isLoggedIn = useSelector((state) => state.userreducer.isLoggedIn);
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let status = useSelector((state)=> state.eventreducer.deleteStatus)

    return (
      <div className="container mt-3">
        {/* <button className="btn btn-warning" onClick={()=>
                                                  navigate({pathname:'/', search:createSearchParams({id:id}).toString()})
                                                }>Go Back</button> */}
        {myEvent !== undefined ? (
          <div className="row mt-5">
            <div className="col-md-4">
              <p>
                <img src={myEvent.imageurl} className="img-fluid" />
              </p>
            </div>
            <div className="col-md-6">
              <p>{myEvent.eventname}</p>
              <p>{myEvent.date}</p>
              <p>{myEvent.region}</p>
              <p>{myEvent.description}</p>
              <br/>
              {/* <button type="submit" className="btn btn-primary" onClick={handleDelete(event.id)} >Delete</button> */}
            </div>
          </div>
        ) : (
          <div>No event yet</div>
        )}
        <div className="col-md-3">
              
              {/* <button className="btn btn-warning" onClick={()=>props.handleEdit(item)}>Edit</button>
              &nbsp;&nbsp; */}
              {isLoggedIn && <button type="submit" onClick={() => onDelete(myEvent.id)} className="btn btn-primary">Delete </button>}
              {console.log('button clicked', myEvent.id)}
        </div>
      </div>
    );
  }