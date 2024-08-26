import React, {useEffect, useRef, useState} from 'react';
import './css/ABCrollbar.css';
import Tooltip from '@mui/material/Tooltip';

type Props = {
  label: string,
  touchPosition: number | null,
  callback?:Function
}

export const Letter:React.FC<Props> = ({label, touchPosition, callback}) => {

  const [active, setActive] = useState<boolean>(false)
  
  const self = useRef(null);
  const selfTop = self.current?.getBoundingClientRect().top | 0
  const selfHeight = self.current?.getBoundingClientRect().height | 0
  const selfArea = {
    start: selfTop,
    end: selfTop + selfHeight
  }

  useEffect(()=>{

    if (touchPosition !== null && touchPosition >= selfArea.start && touchPosition <= selfArea.end){
      setActive(true)
      callback?.(label);
    } else if(active === true){
      setActive(false)
    }

  },[touchPosition] )

  return (
    <>
    <Tooltip title={label} placement="left-start" arrow>
    <li 
      className = {active ? "ABCrollbar-li ABCrollbar-li-active" : "ABCrollbar-li"}
      ref={self}>
      {label}
    </li>

    </Tooltip>


    </>
  )
}
