import React from 'react';
import styles from './navigation.module.css';

import {Link} from 'react-router-dom';

const Nav = (props) => {
    return (
        <section>
            <nav className={styles.mynav}>
                <h1><Link to="/">Shop</Link></h1>
                <ul>
                    <li><Link to="/wishlist">Wishlist</Link></li>
                </ul>
            </nav>
        </section>
    )
};

export default Nav;
