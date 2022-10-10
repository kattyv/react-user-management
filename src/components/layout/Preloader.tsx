import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/useReduxTyped';

export const Preloader = () => {
  const isVisible = useAppSelector(state => state.preloader.value);

  // useEffect(() => {

  //   return setIsVisible(false);
  // }, [])

  return (
    <div className={`pg-preloader ${isVisible ? 'visible' : ''}`}>
        <i className="icon icon-loading spinner"></i>
        Loading, please wait...
    </div>
  )
}
