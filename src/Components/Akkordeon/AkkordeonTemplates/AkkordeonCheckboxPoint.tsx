import React, {useContext, useState} from 'react';
import SampleDataContext from '../../../Context/SampleDataContext.tsx';

type Props = {
    title: string | JSX.Element,
    value: any
    defaultChecked: boolean,
    callbackOnClick?:Function,
}


export const AkkordeonCheckboxPoint:React.FC<Props> = ({title, value, defaultChecked, callbackOnClick}) => {

    const [isChecked, setIsChecked] = useState<boolean>(defaultChecked)
    const {filterFunction} = useContext(SampleDataContext)

    function handleClick():void{
        setIsChecked(!isChecked)
        callbackOnClick?.({name: value, display: !isChecked})
    }

    // console.debug("DATA:", data)


  return (

  )
}
