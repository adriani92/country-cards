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

      if (filterDoesDisplay?.includes(contentListPoint))
      {       
        setIsChecked(true)
        
      }else{
          setIsChecked(false)
        }
    }, [filterDoesDisplay])



    function handleClick():void{
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
