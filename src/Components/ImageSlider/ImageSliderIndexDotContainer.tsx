import React from 'react';
import { ImageSliderIndexDot } from './ImageSliderIndexDot.tsx';


type Props = {
    imgLinks: [string, string?, string?, string?, string?],
    activeIndex: number,
    handleClick(index:number):void
}


export const ImageSliderIndexDots:React.FC<Props> = ({imgLinks, activeIndex, handleClick}) => {

    function createIndexDots():JSX.Element{

        const dots = imgLinks.map((element, index)=>(
            <ImageSliderIndexDot 
                isActive={activeIndex === index}
                index={index}
                handleClick={handleClick}
                key={`${imgLinks[index]}`}
            />
        ))
    
        return (
            <div className = "img-dot-container" >
                {dots}
            </div>
        )
    }


  return (
    <>
        {createIndexDots()}
    </>
  )
}
