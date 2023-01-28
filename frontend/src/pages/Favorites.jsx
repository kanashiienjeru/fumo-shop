import React from "react";
import styles from '../app.module.css'
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const Favorites = ({ items, isLoading }) => {

  console.log(items)
  const [searchValue, setSearchValue] = React.useState('')
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)

  }
  const renderItems = () => {
    const filteredItems = items.filter(item => item.product.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (
      (isLoading ? [...Array(4)] : filteredItems)
        .map((item, i) =>
          <Card
            key={i}
            favorited={true}
            {...item.product} />
        )
    )
  }
  return (
    <div className={styles.content}>
      <div className={styles.div}>
        <h1>
          {searchValue
            ? `Результаты по запросу: ${searchValue}`
            : "Мои закладки"}
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
      {isLoading ? <Skeleton /> : items.length > 0
        ? (
          <>
            <div className={styles.toys}>
              {renderItems()}
            </div>
          </>
        ) : (
          <div className={styles.emptyFavorites}>
            <img src="/images/smile.jpg" alt="" />
            <h2>Закладок нет :(</h2>
            <p>Вы ничего не добавляли в закладки</p>
            <Link to="/">
              <button className={styles.backButton}>
                <img src="/images/arrow.svg" alt="" />
                Вернуться назад
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}

export default Favorites