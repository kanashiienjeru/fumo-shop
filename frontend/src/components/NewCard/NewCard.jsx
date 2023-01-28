import React from "react";
import styles from './NewCard.module.css'
const NewCard = ({ createProduct }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')

  const onChangeTitle = (val) => {
    setTitle(val.target.value)
  }

  const onChangePrice = (val) => {
    setPrice(val.target.value)
  }

  const onChangeImg = (val) => {
    setImageUrl(val.target.value)
  }
  return (
    <>
      <div className={styles.card} onClick={() => setIsOpen(!isOpen)}>
        <img className={styles.plus} src="images/createImg.svg" alt="" />
      </div>

      { isOpen ? (
        <div className={styles.overlay}>
        <div className={styles.window}>
          <div>
          <label htmlFor="title">Наименование товара:</label><input type="text" id="title" value={title} onChange={onChangeTitle} />
          </div>
          <div>
          <label htmlFor="price">Цена:</label><input type="text" id="price" value={price} onChange={onChangePrice}/>
          </div>
          <div>
          <label htmlFor="imageUrl">Ссылка на изображение:</label><input type="text" id="imageUrl" value={imageUrl} onChange={onChangeImg} />
          </div>
          <button onClick={() => {
            createProduct({ "title": title, "price": price, "imageUrl": imageUrl})
            setIsOpen(false)
            setTitle('')
            setPrice('')
            setImageUrl('')
          }}>Добавить продукт</button>
        </div>
      </div>
      ) : null }
    </>

  )
}

export default NewCard