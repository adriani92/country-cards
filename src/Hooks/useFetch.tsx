import {useEffect, useState} from 'react'


export const useFetch:Function = (URL: string) => {

    const [data, setData] = useState<Object | null | false>(null);
    const [error, setError] = useState<Error | null>(null);
    const [done, setDone] = useState<boolean>(false);

    useEffect(()=>{

        if (done === false) {
            customFetch(URL);
        }

    }, [])

    function customFetch(URL:string):Promise<Object>{

        return fetch(URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(response.json());
                    }, 1000);
                });
            })
            .then((data)=>{
                setDone(true)
                setData(data)
                return data as Object;
            })
            .catch((error) => {
                setError(error);
                setDone(true);
                console.error("Error fetching data:", error);
                throw error; 
            });
         }

  return (
    {data, error, done}
  )
}
