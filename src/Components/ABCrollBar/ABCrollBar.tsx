import React, {useState, useEffect, useRef} from 'react';
import {Letter} from './Letter.tsx';
import './css/ABCrollbar.css';


export const ABCrollBar:React.FC = () => {

 const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

 const [touchPosition, setTouchPosition] = useState<number | null>(null);
 const [mouseHolding, setMouseHolding] = useState<boolean>(false);

 const scrollBarRef = useRef<HTMLUListElement>(null);


 useEffect(()=>{

    scrollBarRef.current?.addEventListener('touchmove', prevent, {passive: false});
    

    return () => {
        scrollBarRef.current?.removeEventListener('touchmove', prevent);
    }

 },[])



 function fireCallback(target: string){

     const AllRenderedCardsObj = document.querySelectorAll(".card-title");
     const AllRenderedCardsArr = Array.from(AllRenderedCardsObj)
     const matchedTitleNode = AllRenderedCardsArr.find((element) => element.innerHTML.startsWith(target))
     
     if (matchedTitleNode ){
        const CardOfmatchedTitleNode = matchedTitleNode.parentElement.parentElement
        CardOfmatchedTitleNode.scrollIntoView({ behavior: "smooth"})
        //  window.scrollBy(0, 500);
     }

    
 }



 function prevent(ev: TouchEvent):void{
     ev.preventDefault();
 };

 function handleTouchMove(event: React.TouchEvent<HTMLUListElement>):void{
    event.preventDefault();
    setTouchPosition(event.touches[0].clientY)
 }

 function handleMouseMove(event: React.MouseEvent<HTMLUListElement>):void{

    if (mouseHolding){
        event.preventDefault();
        setTouchPosition(event.clientY)
    }
 }

 function handleMouseUp(event: React.MouseEvent<HTMLUListElement>):void{
    setMouseHolding(false); 
    handleTouchEnd()
 }

 function handleTouchEnd():void{
    setTouchPosition(null)
 }

 function handleClick(event: React.MouseEvent<HTMLUListElement>):void{

    event.preventDefault();

    let position:number = event.clientY;  
    setTouchPosition(position)

    setTimeout(()=>{
        handleTouchEnd()
    },1000)

 }

 function createLetterNodes():JSX.Element{

    const letters = abc.map((letter, index)=>(
        <Letter 
            key = {`${letter + index}`} 
            label = {letter}
            touchPosition = {touchPosition}
            callback={fireCallback}
        />

    ))

    return (

        <>
            {letters}
        </>
    )
}



  return (

    <ul 
        className = "letter-list-container"
        ref={scrollBarRef}
        onTouchMove={(event) => handleTouchMove(event) }
        onTouchEnd={()=>handleTouchEnd()}
        onMouseMove={(event)=>handleMouseMove(event)}
        onMouseDown={()=>setMouseHolding(true)}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
    > 
        { createLetterNodes()}   
    </ul>


  )
}
