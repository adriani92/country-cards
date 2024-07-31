import React, {useState, useRef} from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Lottie from 'react-lottie';
import likeIcon from '../../Assets/like-it.json'

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
  const lottieLike = useRef(null)



  function toggleLike():void{
    setLiked(!liked)
  }

  // function toggleLottieLike():void{

  //   setLiked(prevLiked => !prevLiked);

  //   if (liked){
  //     disLike()
  //   } else{
  //     like()
  //   }

  //   function like(){
  //     console.log("like it. ")
  //     const noLikeTillLike = [24, 80]
  //     lottieLike?.current.playSegments(noLikeTillLike, true)
  //   }

  //   function disLike(){
  //     console.log("dislike it ")
  //     const likedTillNoLike = [80, 20]
  //     lottieLike?.current.playSegments(likedTillNoLike, true)
  //   }

  // }


  // const lottieOptions = {
  //   loop: false,
  //   autoplay: false,
  //   animationData: likeIcon,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   },
  //   initialSegment: [24, likeIcon.op]
  // }


  return (
    <div className = "CardContainer">


        {
          liked ? 
            <FavoriteIcon 
            className = "card-like-icon"
            onClick = {toggleLike}
            />

            // <div className = "card-like-icon lottie-like"
            // onClick = {toggleLottieLike}
            // >
            //   <Lottie 
            //   ref={lottieLike}
            //   options={lottieOptions}
            //   />
            // </div>
            

          :
            <FavoriteBorderIcon 
              className = "card-like-icon"
              onClick = {toggleLike}
            />


            // <div className = "card-like-icon lottie-like"
            // onClick = {toggleLottieLike}
            // >
            //   <Lottie  
            //   ref={lottieLike}
            //   options={lottieOptions}
            //   />
            // </div>
            


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
