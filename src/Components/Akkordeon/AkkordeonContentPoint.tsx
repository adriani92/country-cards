import React, {useState,useContext, useEffect} from 'react';
import SampleDataContext from '../../Context/SampleDataContext.tsx';

type Props = {
    contentListPoint: string,
    handleClickOnListPoint?: (value: string, display: boolean ) => void;
}

export const AkkordeonContentPoint:React.FC<Props> = ({contentListPoint, handleClickOnListPoint}) => {

    const [isChecked, setIsChecked] = useState<boolean>(true)
    const {filterDoesDisplay, filterFunction} = useContext(SampleDataContext)

    useEffect(()=>{

      console.log("Fitler does display:", filterDoesDisplay)

      if (filterDoesDisplay?.includes(contentListPoint))
      {       
        setIsChecked(true)
        console.debug("Yes filter is in array")
        
      }else{
          setIsChecked(false)
        }
    }, [filterDoesDisplay])



    function handleClick():void{
        // setIsChecked(!isChecked)
        console.debug({name: contentListPoint, display: !isChecked})
        filterFunction({name: contentListPoint, display: !isChecked})
    }

  return (
    <>
    <li className="akkordeon-content-point" onClick={handleClick}>
      <form>
          <label>{contentListPoint}</label>
          <input type = "checkbox" checked={isChecked} onChange={handleClick}/>
      </form>
    </li>
    <hr className = "akkordeon-content-point-hr"></hr>
    </>
  )
}
