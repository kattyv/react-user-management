import React, { useEffect, useState } from 'react'
import iconLoading from '../../assets/img/icons/icon-loading.svg'
import { useAppSelector } from '../../hooks/useReduxTyped';

export const Preloader = () => {
  const isVisible = useAppSelector(state => state.preloader.value);

  // useEffect(() => {

  //   return setIsVisible(false);
  // }, [])

  return (
    <div className={`pg-preloader ${isVisible ? 'visible' : ''}`}>
        <img src={iconLoading} alt="" className='spinner' />
        Loading, please wait...
    </div>
  )
}
