import React, { useState } from 'react';
import { addSlice } from '../slices/addValueSlice'

import {useDispatch,useSelector}from 'react-redux'

export const Input = () => {
  const[value,setValue]=useState(0);
  const dispatch = useDispatch();

  return (
    <div className='flex flex-row gap-5'>
        <input value={value} onChange={(e)=>setValue(e.target.value)} type="number" className='border'/> 
        <button onClick={()=>dispatch(addSlice(value))} className='border'>Add</button>
    </div>
  )
}
