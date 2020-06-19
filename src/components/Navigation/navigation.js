import React from 'react';
import styles from './navigation.module.css';

import {Link} from 'react-router-dom';

const Nav = (props) => {
    return (
        <section>
            <nav className={styles.mynav}>
                <h1><Link to="/">Platform</Link></h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </section>
    )
};

export default Nav;
