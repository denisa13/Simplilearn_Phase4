import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reduxslice/userslice';
import {useNavigate} from 'react-router-dom';

const initialState = {
    "username": "denisa",
    "password": "den123"
}

export default function Login({ setStatus, setUsename }) {
    const [user, setuser] = useState(initialState)
    const [error, setError] = useState()
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let status = useSelector((state)=> state.userreducer.loginstatus)
    let username = useSelector((state)=> state.userreducer.username)

    useEffect(()=>{
		if(status === 'success'){
			navigate('/')
		}
		else if(status === 'failure'){
			setError('Invalid Credentials')
		}
			
  },[status])

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser(user))
        console.log(user) 
        console.log('submit')
    }

    return (
        <div className="container">

            <h1>Login</h1>
            <p style={{ color: 'red' }}>{error && error}</p>
            <form>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">User Name
                    </label> <input type="text" className="form-control"
                        name="username" value={user.username} onChange={(event) => setuser({ ...user, [event.target.name]: event.target.value })}
                        id="formGroupExampleInput2" placeholder="Username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password
                    </label> <input type="password" className="form-control"
                        name="password" value={user.password} onChange={(event) => setuser({ ...user, [event.target.name]: event.target.value })}
                        id="formGroupExampleInput2" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}