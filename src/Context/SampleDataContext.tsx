import { createContext} from 'react';

type DataContext = {
    data?: Destinations,
    filterDoesDisplay:[],
    filterFunction:(keyword:{name:string, display: boolean}) => void
}

type Destinations = Destination[]

type Destination = {
    city?: string,
    description?: string,
    photos?: [string, string?, string?, string?, string?]
    country?: string
};
  
const SampleDataContext = createContext<DataContext>({data: [], filterFunction:(keyword:{name:string, display: boolean})=>{}});
export default SampleDataContext;