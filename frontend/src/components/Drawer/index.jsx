import React, { useContext, useState } from 'react'
import styles from "./Drawer.module.css"

const Drawer = ({ items, cartOpened, setCartOpened, delFromCart }) => {
  console.log(items.map(item => item))

    return (
      cartOpened
      ? (
        <div className={styles.overlay}>
        <div className={styles.drawer}>
          <h1>
            Корзина
            <img onClick={() => setCartOpened(false)} src="/images/btn-remove.svg" alt="" />
          </h1>
          {items.length >= 1 ? (
            <ul className={styles.cartItems}>
              {items.map((item, index) => (
                <li className={styles.cartItem} key={index}>
                  <img width={70} height={70} src={item.product.imageUrl} alt="" />
                  <div className={styles.cartItemInfo}>
                    <p>{item.product.title}</p>
                    <b>{item.product.price} руб.</b>
                  </div>
                  <img
                    src="/images/btn-remove.svg"
                    alt=""
                    onClick={() => delFromCart(item.product._id)} 
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyCart}>
              <img src="/images/cart-empty.jpg" alt="cart empty" />
              <h3>Корзина пустая</h3>
              <p>Добавьте хотя бы одну игрушку, чтобы сделать заказ.</p>
              <button onClick={() => setCartOpened(false)} className={styles.backButton}>
                <img src="/images/arrow.svg" alt="" />
                Вернуться назад
              </button>
            </div>
          )}
          {items.length >= 1 ? (
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>написать код</b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>написать код</b>
                </li>
              </ul>
              <button>
                Оформить заказ
                <img src="/images/arrow.svg" alt="" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      ) : null
    );
}

export default Drawer