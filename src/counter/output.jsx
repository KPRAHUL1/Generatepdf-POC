import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {resetSlice} from '../slices/addValueSlice'

export const Output = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.add.value);

  const resetAll = () => {
    dispatch(resetSlice());
  };
  

  return (
    <div className='flex gap-10 flex-row'>
        <p> The Value is:{value}</p> <button className='border' onClick={resetAll}>Reset</button>
    </div>
  )
}
