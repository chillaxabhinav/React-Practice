import React from 'react';
import styles from './card.module.css';
import {Link} from 'react-router-dom';

const Card = (props) => {
    return (
        
            <div className={styles.card}>
                <div style={{ textAlign: "center", marginBottom: "6rem", fontSize: "1.5rem", fontWeight: "lighter" }}>{props.title}</div>
                <div className={styles.buttonParent}>
                    <button className={styles.button} onClick={props.onAddToCart}>Add to Cart</button>
                    <Link to={`/${props.cardId}`}><button className={styles.button} onClick={props.onAddToCart}>Item Details</button></Link>
                </div>
            </div>
        
    )
}

export default Card;