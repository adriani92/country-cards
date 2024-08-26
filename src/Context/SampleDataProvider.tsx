import { useEffect, useState, useReducer} from 'react';
import { useFetch } from '../Hooks/useFetch.tsx';
import SampleDataContext from './SampleDataContext.tsx';


type Props = {
    children: React.FC[],
  }

type Destinations = Destination[]

type Destination = {
    city?: string,
    description?: string,
    photos?: [string, string?, string?, string?, string?]
    country?: string
};

type DataState = {
    fullData: Destinations,
    filteredData: Destinations,
    filterDoesDisplay: string[],
}

const initDataState = {
  fullData: [],
  filteredData: [],
  filterDoesDisplay:  ["Japan", "Thailand", "India", "South Korea", "Turkey", "United Kingdom", "France", "Spain", "United States", "Canada", "Mexico"]
}

export const SampleDataProvider:React.FC<Props> = ({children}) => {

    const fetchedData = useFetch(`${process.env.PUBLIC_URL}/data.json`);
    const [loading, setLoading] = useState<boolean>(true)
    const [dataState, dispatch] = useReducer(reducer, initDataState)
    
    function reducer(state: DataState, action: {type:string, payload: string | string[] | Destinations}){

      let newState:DataState;
      let newFilters:[];

      switch (action.type) {
        case "UPDATE_FULL_DATA":
            newState = {
              ...state,
              fullData: action.payload,
              filteredData: action.payload
            }
            setLoading(false)
            return newState

        case "ADD_FILTER":

          newFilters = [...state.filterDoesDisplay, action.payload ]

          newState = {
            ...state,
            filteredData: filter_fullData(state.fullData, newFilters),
            filterDoesDisplay: newFilters
          }
          
          setLoading(false)
          return newState;

        case "REMOVE_FILTER":
          newFilters = state.filterDoesDisplay.filter(element => element !== action.payload)

          newState = {
            ...state,
            filteredData: filter_fullData(state.fullData, newFilters),
            filterDoesDisplay: newFilters
          }
          setLoading(false)
          return newState;

        default:
          break;
      }

    }

    useEffect(()=>{

        if (fetchedData && fetchedData.done && loading) {
            dispatch({type:"UPDATE_FULL_DATA", payload: fetchedData.data})
        } 

    }, [fetchedData])

    function filter_fullData(fullData:Destinations, keywords:string[]){

        let filteredData;

        if (keywords.length > 0 && fullData) {

          filteredData = fullData.filter((destination) =>
              keywords.includes(destination.country)
              
          );

        } else{
          filteredData = [];
        }

        return filteredData
    }



    function filter(keyword: {name: string, display: boolean}){

      setLoading(true)

      if (!dataState.filterDoesDisplay.includes(keyword.name) && keyword.display === true) {
        dispatch({type: "ADD_FILTER", payload: keyword.name})
      } else if (dataState.filterDoesDisplay.includes(keyword.name) && keyword.display === false){
        dispatch({type: "REMOVE_FILTER", payload: keyword.name})
      }


    }
    
  
  const providingValue = {
    data: !loading ? dataState.filteredData : null,
    filterDoesDisplay: dataState.filterDoesDisplay,
    filterFunction: filter
  }

  return (
    <SampleDataContext.Provider value = {providingValue}>
            {children}
    </SampleDataContext.Provider>
  )
}





