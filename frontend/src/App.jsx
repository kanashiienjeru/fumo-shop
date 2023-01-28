// libs
import React, { useState } from 'react'
import axios from 'axios'
import { Routes, Route } from "react-router-dom";

// components
import Header from './components/Header'
import Drawer from './components/Drawer'

// styles
import styles from './app.module.css'

// pages
import Home from './pages/Home'
import Favorites from './pages/Favorites'


export const Context = React.createContext()

function App() {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favItems, setFavItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // функции корзины
  const [cartOpened, setCartOpened] = useState(false)

  // добавление/удаление продукта

  const createProduct = async (obj) => {
    const product = await axios.post('http://localhost:4444/products/create', obj)

    setItems(prev => [...prev, product.data])
  }
  
  const deleteProduct = async (id) => {
   await axios.delete(`http://localhost:4444/products/del/${id}`)
   setItems(prev => prev.filter(item => item._id !== id))
   delFromFavorite(id)
   delFromCart(id)
  }

  const addToFavorite = async (id) => {
    const product = await axios.post(`http://localhost:4444/favorites/add/${id}`)
    setFavItems(prev => [...prev, product.data ])
  }

  const delFromFavorite = async (id) => {
    await axios.delete(`http://localhost:4444/favorites/del/${id}`)
    setFavItems(prev => prev.filter(item => item.product._id !== id))
  }

  const addToCart = async (id) => {
    const product = await axios.post(`http://localhost:4444/cart/add/${id}`)
    setCartItems(prev => [...prev, product.data ])
  }

  const delFromCart = async (id) => {
    await axios.delete(`http://localhost:4444/cart/del/${id}`)
    setCartItems(prev => prev.filter(item => item.product._id !== id))
  }

  // загрузка данных
  React.useEffect(() => {

    async function fetchData() {
      try {
        const itemsResponse = await axios.get('http://localhost:4444/products/getProducts')
        const cartItemsResponse = await axios.get('http://localhost:4444/cart')
        const favItemsResponse = await axios.get('http://localhost:4444/favorites')
        
        setItems(itemsResponse.data)
        setCartItems(cartItemsResponse.data)
        setFavItems(favItemsResponse.data)
        setIsLoading(false)
      } catch (error) {
        alert('Загрузка данных не удалась')
        console.log(error)
      }
    }

    fetchData()
  }, [isLoading])

  return (
    <Context.Provider value={{ items,cartItems, favItems, isLoading,setIsLoading, createProduct,deleteProduct,addToFavorite, delFromFavorite, addToCart, delFromCart }}>
      <div className={styles.wrapper}>
        <Header setCartOpened={setCartOpened}/>
        <Drawer items={cartItems} cartOpened={cartOpened} setCartOpened={setCartOpened} delFromCart={delFromCart}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites items={favItems} isLoading={isLoading}/>} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
