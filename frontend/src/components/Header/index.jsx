import styles from "./Header.module.css"
import { Link } from 'react-router-dom'

const Header = ({ setCartOpened }) => {

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img width={65} src="/images/fumo.jpg" />
        <Link to="/">
          <div className={styles.headerTextContent}>
            <h3>FUMOSTORE</h3>
            <p>Магазин лучших игрушек Фумо</p>
          </div>
        </Link>
      </div>
      <ul className={styles.headerRight}>
        <li onClick={() => setCartOpened(true)}>
          <img src="/images/cart.svg" />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/images/heart.svg" alt="" />
          </Link>
        </li>
        <li>
          <img src="/images/user.svg" alt="" />
        </li>
      </ul>
    </header>
  );
}

export default Header