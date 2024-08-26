import React, {useState} from 'react';
import { ImageSliderIndexDots } from './ImageSliderIndexDotContainer.tsx';
import { useSwipeable } from 'react-swipeable';
import './css/ImageSlider.css'

type Props = {
    title: string,
    excerpt: string,
    imgLinks: [string, string?, string?, string?, string?],
}

export const ImageSlider:React.FC<Props> = ({imgLinks, title, excerpt}) => {

const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
const numberOfSlides = imgLinks.length - 1;
const [stopScroll, setStopScroll] = useState(false);

const SwipeHandlers = useSwipeable({
    onSwiped: () => {setStopScroll(false)}, 
    onSwipedLeft: () => {setStopScroll(true); nextSlide() },
    onSwipedRight: () => {setStopScroll(true); prevSlide()},
    delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
    trackTouch: true,                      // track touch input
    trackMouse: false,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
  });


    function changeIndex(index:number):void{
        setActiveImageIndex(index);
    }


    function nextSlide(){
        if (activeImageIndex + 1 > numberOfSlides) {
            setActiveImageIndex(0)
        } else{
            setActiveImageIndex((prevState) =>
                prevState + 1
            )
        } 
    }

    function prevSlide(){

        if (activeImageIndex - 1 < 0) {
            setActiveImageIndex(numberOfSlides)
        } else{
            setActiveImageIndex((prevState) =>
                prevState - 1
            )
        }
    }

    function createImgNodes():JSX.Element{

        const imgs = imgLinks.map((link, index)=>(
            <img 
                key = {link} 
                src={link} 
                alt ={title + index.toString()} 
                className = "image-slider-img"
                style = {{translate: `${activeImageIndex * -100}%`} }
            />
        ))
    
        return (
            <div className = "img-slides small">
                {imgs}
            </div>
        )
    }

  return (

    <>
    <figure className = "image-slider" {...SwipeHandlers} style={{ touchAction: stopScroll ? 'none' : 'auto' }}>

        {createImgNodes() }
        <ImageSliderIndexDots 
            imgLinks={imgLinks} 
            activeIndex={activeImageIndex} 
            handleClick={changeIndex}
        />


    </figure>
    </>
  )
}
