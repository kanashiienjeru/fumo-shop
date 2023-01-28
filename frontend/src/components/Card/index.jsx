import React, { useState } from "react"
import styles from '../Card/Card.module.css'
import { Context } from '../../App'
import Skeleton from "../Skeleton"

const Card = ({ _id, title, price, imageUrl, favorited = false, added = false }) => {
  const { cartItems, isLoading, deleteProduct, addToFavorite, delFromFavorite, addToCart, delFromCart } = React.useContext(Context)
  const [isAdded, setIsAdded] = useState(added)
  const [isFavorited, setIsFavorited] = useState(favorited)
  React.useEffect(() => {
    setIsAdded(added)
    setIsFavorited(favorited)
  },[added,favorited])
  const onClickFav = () => {
    if (isFavorited) {
      delFromFavorite(_id)
      setIsFavorited(!isFavorited)
    } else {
      addToFavorite(_id)
      setIsFavorited(!isFavorited)
    }
  }

  const onClickAdd = () => {
    if (isAdded) {
      delFromCart(_id)
      setIsAdded(!isAdded)
    } else {
      addToCart(_id)
      setIsAdded(!isAdded)
    }
  }
  return (
    <div onClick={() => console.log(_id)} width={210} className={styles.card}>
      {
        isLoading ? (
          <Skeleton />
        ) : (
          <>
            <img 
              onClick={() => {
                deleteProduct(_id)
              }} 
              className={styles.delete} 
              width={25}
              src="images/trashcan.png" 
              alt="" 
            />
            <div className={styles.cardOptions}>
              <img
                  className={styles.favorite}
                  onClick={onClickFav}
                  width={25}
                  height={25}
                  src={isFavorited ? 'images/heart-liked.png' : '/images/heart.png'}
                  alt="heart"
                />
                <img
                  onClick={onClickAdd}
                  width={25}
                  height={25}
                  className={styles.plus}
                  src={isAdded ? 'images/selected.svg' : '/images/bag.png'}
                  alt="plus"
                />
            </div>
            <img className={styles.productImg} style={{ width:"100%", height:"160px"}} src={imageUrl} alt="toys" />
            <p>{title}</p>
            <div className={styles.cardBottom}>
              <div className={styles.cardBottomText}>
                <p>Цена:</p>
                <b>{price} руб.</b>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
}

export default Card