
import React, {useState, useEffect} from 'react'

export const useTouchPoint = (e:React.TouchEvent<HTMLImageElement>, action:boolean) => {

  const [touching, setTouching] = useState<boolean>(false);
  const [touchXPosition, setTouchXPosition] = useState<number>(e.touches[0].pageX);
  const [touchYPosition, setTouchYPosition] = useState<number>(e.touches[0].pageY);
  
  const [newDot, setNewDot] = useState<JSX.Element | null>(null)

  
  useEffect(()=>{

    switch (action) {
      case true:
        showDot(e)
        break;
      default:
        break;
    }

    function showDot(e:React.TouchEvent<HTMLImageElement>):void{
    
      const dot = 
                <div 
                  style={{
                    width: '30px', 
                    height: '30px', 
                    backgroundColor: 'red', 
                    borderRadius: '50%', 
                    zIndex: '2', 
                    position: 'absolute', 
                    left: `${touchXPosition}px`, 
                    top: `${touchYPosition}px`, 
                  }}
                >
                </div>

      setNewDot(dot)
        

    }

    function hideDot():void{
        setTouching(false)

    }



  },[])


  return (
    {newDot}
  )


}
