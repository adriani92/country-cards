import React from 'react';
import {useState} from 'react';
import {AkkordeonSingleTab} from './AkkordeonSingleTab.tsx'
import './css/Akkordeon.css'


type MenuStructure = {
  tabname: string,
  checkboxes?: string[]
}

type Props = {
    structure: MenuStructure[]
}


const Akkordeon: React.FC<Props> = ({structure})  => {

  const [isOpen, setIsOpen] = useState<number | null>(null)

  function handleClickOnListPoint(value: string, active: boolean){
  }


  function handleClickOnSummary(event: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>, index: number, isOpen:boolean ): void{
    event.preventDefault();
    if (ref.current && isOpen === false){
      setIsOpen(index)
    } else if (ref.current && isOpen === true){
      setIsOpen(null)
    }

  }

  function createDetails(): JSX.Element{

  const akkordeonContainer:JSX.Element[] = structure.map((element:MenuStructure, index: number)=>(
    <AkkordeonSingleTab 
      title={element.tabname} 
      content={element.checkboxes} 
      isOpen={index === isOpen}
      index={index} 
      handleClickOnSummary={handleClickOnSummary}
      handleClickOnListPoint={handleClickOnListPoint}
      key={`${element.tabname + index}`} 
    />

   ))
  
  return (<div className = "akkordeon-container">{akkordeonContainer}</div>)
}

    return (
      
      <>
       {createDetails()}
      </>
    
    )
}

export default Akkordeon;