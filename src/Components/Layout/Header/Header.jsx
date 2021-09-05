import { Fragment } from 'react'

import img from '../../../assets/sharon-mccutcheon-8lnbXtxFGZw-unsplash.jpg'
import classes from './Header.module.css'

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>{props.title}</h1>
      </header>
      <div className={classes['header-image']}>
        <img src={img} alt='Controlling money flow!' />
      </div>
    </>
  )
}
export default Header
