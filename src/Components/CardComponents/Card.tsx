import React, {useState, useRef} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Skeleton } from '@mui/material';

import { ImageSlider } from '../ImageSlider/ImageSlider.tsx';
import './css/Card.css';

type Props = {
    title: string | null,
    excerpt: string | null,
    imgLinks: [string?, string?, string?, string?, string?],
    loading: boolean,
}

export const Card:React.FC<Props> = ({title, excerpt, imgLinks, loading}) => {

  const initLikedValue: boolean = false;
  const [liked, setLiked] = useState<boolean>(initLikedValue)


  function toggleLike():void{
    setLiked(!liked)
  }

  return (
    <div className = "CardContainer">

        {
          liked ? 
            <FavoriteIcon 
            className = "card-like-icon"
            onClick = {toggleLike}
            />
            
          :
            <FavoriteBorderIcon 
              className = "card-like-icon"
              onClick = {toggleLike}
            />
        }


        {
          loading ?

          <>
            <Skeleton variant="rectangular" sx={{ width: '100%', height: '180px', }} />
            <figcaption>
                <Skeleton variant="text" sx={{ fontSize: '2rem', width: '45%', marginTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </figcaption>
          </>

          :

          <>
            <ImageSlider imgLinks= {imgLinks} title = {title} excerpt={excerpt} />
            <figcaption>
                <h3 className = "card-title">{title}</h3>
                <p>{excerpt}</p>
            </figcaption>
          </>
        }

    </div>
  )
}
