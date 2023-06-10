import {configureStore} from '@reduxjs/toolkit';
import userreducer from './reduxslice/userslice'
import eventreducer from './reduxslice/eventslice';

export default configureStore({
    reducer:{
        userreducer,
        eventreducer

    }
});