import React from 'react'

type Props = {
    index: number,
    isActive: boolean,
    handleClick(index:number):void
}

export const ImageSliderIndexDot:React.FC<Props> = ({isActive, handleClick, index}) => {
  return (
    <button 
    className = {isActive ? "image-slider-dot-active" : "image-slider-dot-inactive"} 
    onClick = {()=>handleClick(index)}
    />
  )
}
