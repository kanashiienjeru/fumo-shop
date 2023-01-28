import React from 'react'
import Card from '../components/Card'
import styles from '../app.module.css'
import NewCard from '../components/NewCard/NewCard'
import { Context } from '../App'


const Home = () => {
  const { items,favItems, cartItems, isLoading, createProduct } = React.useContext(Context)
  const [searchValue, setSearchValue] = React.useState('')
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)

  }
  const renderItems = () => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (
      (isLoading ? [...Array(8)] : filteredItems)
      .map((item, i) => 
        <Card
          key={i}
          favorited = {((favItems.filter(fav => fav.product._id === item._id)).length > 0) ? true : false}
          added = {((cartItems.filter(cart => cart.product._id === item._id)).length > 0) ? true : false}
          {...item} />
          )
    )
  }
  return (
    <div className={styles.content}>
      <div className={styles.div}>
        <h1>
          {searchValue
            ? `Результаты по запросу: ${searchValue}`
            : "Все игрушки"}
        </h1>
        <div className={styles.searchBlock}>
          <img src="/images/search.svg" alt="search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              width={20}
              height={20}
              src="/images/btn-remove.svg"
              alt=""
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск "
          />
        </div>
      </div>
      <div className={styles.toys}>
        {renderItems()}
        <NewCard createProduct={createProduct}/>
      </div>
    </div>
  );
}

export default Home