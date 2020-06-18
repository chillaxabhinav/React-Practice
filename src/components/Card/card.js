import React from 'react';
import styles from './card.module.css';
import {Link} from 'react-router-dom';

const Card = (props) => {
    return (
        <Link to={`/${props.cardId}`}>
            <div className={styles.card}>
                <div style={{ textAlign: "center", marginBottom: "6rem", fontSize: "1.5rem", fontWeight: "lighter" }}>{props.title}</div>
                <div className={styles.buttonParent}>
                    <button className={styles.button}>Add to Cart</button>
                    <button className={styles.button}>Add to Wishlist</button>
                </div>
            </div>
        </Link>
    )
}

export default Card;