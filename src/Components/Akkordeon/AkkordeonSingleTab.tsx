import React, {useRef} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { AkkordeonContentPoint } from './AkkordeonContentPoint.tsx';


type Content= {
  title: string;
  content: [string | JSX.Element];
}

type AkkordeonContent = Content & {
    isOpen: boolean;
    index: number;
    handleClickOnSummary: (event: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>, index: number, isOpen:boolean) => void;
    handleClickOnListPoint?: (event: React.MouseEvent<HTMLLIElement>, ref: React.RefObject<HTMLLIElement> ) => void;
  }


export const AkkordeonSingleTab:React.FC<AkkordeonContent> = ({title, content, isOpen, handleClickOnSummary, handleClickOnListPoint, index}) => {

  const ref = useRef<HTMLDivElement>(null)

  function createContentPoints():JSX.Element{
    
    const list = content.map((listpoint, index)=>(

      <AkkordeonContentPoint 
        key = {listpoint + index.toString()}
        contentListPoint = {listpoint} 
        handleClickOnListPoint = {handleClickOnListPoint}
      />


    ))

    return (
      <ul className = "akkordeon-content">
        {list}
      </ul>)

  }


  return (
    <div className = "akkordeon-single-tab-container" ref={ref} >
        <summary className = "akkordeon-summary" onClick={(event) => handleClickOnSummary(event, ref, index, isOpen)}>
          <h4>{title}</h4>

          {
            isOpen 
            ? 
            <ExpandLessIcon className = "accordion-expand-icon"/>
            :
            <ExpandMoreIcon className = "accordion-expand-icon"/>
          }

        </summary>

        { isOpen 
          ?
          createContentPoints()
          :
          null
        }
    </div>
  )
}

