import React, {useState, useEffect, useContext} from 'react';
import { Card } from './Card.tsx';
import SampleDataContext from '../../Context/SampleDataContext.tsx';

type Destinations = Destination[]

type Destination = {
    city?: string,
    description?: string,
    photos?: [string, string?, string?, string?, string?]
    country?: string
};


export const CardLooper = () => {

    const {data} = useContext(SampleDataContext)
    const [destinations, setDestinations] = useState<Destinations | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{

        if (data) {
            setDestinations(data);
            setLoading(false)
        } 

    }, [data])


    const SortedCards = ():JSX.Element | null => {

        const cards = destinations.map((data)=>(
    
            <Card 
                key = {data.city} 
                title = {data.city} 
                excerpt = {data.description} 
                imgLinks = {data.photos}
                loading = {false}
            />
        ))

        const sortedCards = sortCards(cards)
    
        return <>{sortedCards}</>
    
    
    }

    function sortCards(cards){

        return cards.sort( function (a, b){
            return a.props.title.localeCompare(b.props.title);
            })
    }


    const LoadingCards = ():JSX.Element | null => {

        let numberOfCards = [0,1,2,3,4]
        const cards = numberOfCards.map((index)=>(
    
            <Card 
                key = {index} 
                title = {null} 
                excerpt = {null} 
                imgLinks = {[]}
                loading = {true}
            />
            
    
        ))
        return <>{cards}</>
    
    
    }


    if (!loading && destinations){

        
        return <SortedCards />

        } else if (loading){
        
            return <LoadingCards />
        }
    return null; 
}
