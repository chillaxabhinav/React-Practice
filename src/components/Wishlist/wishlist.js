import React, { Component } from 'react';
import styles from './wishlist.module.css';

export default class wishlist extends Component {

    state = {
        wishlist: []
    }

    componentDidMount() {
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
        this.setState({
            wishlist: wishlist
        });
    }


    removeHandler = (e, id) => {
        let wishlist;
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
        let updated = wishlist.filter(ele => ele.id !== id);
        localStorage.removeItem('wishlist');
        localStorage.setItem('wishlist', JSON.stringify(updated));
        this.componentDidMount();
    }

    addToCartHandler = (e, id) => {
        let wishlist;
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
        const myData = localStorage.getItem('cart');
        let myItemInCart;
        if (myData) {
            const data = JSON.parse(myData);
            localStorage.removeItem('cart');
            myItemInCart = data.find(ele => ele.id === id);
            if (myItemInCart) {
                myItemInCart.quantity++;
            }
            localStorage.setItem('cart', JSON.stringify(data));
        }
        if (!myItemInCart && myData) {
            const data = JSON.parse(myData);
            localStorage.removeItem('cart');
            let myItem = wishlist.find(ele => ele.id === id);
            let updatedItem = {
                ...myItem,
                quantity: 1
            }
            data.push(updatedItem);
            localStorage.setItem('cart', JSON.stringify(data));
            this.removeHandler(null, id);
            return;
        }
        if (myData === null) {
            let cart = [];
            let myItem = wishlist.find(ele => ele.id === id);
            let updatedItem = {
                ...myItem,
                quantity: 1
            }
            cart.push(updatedItem);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        this.removeHandler(null, id);
    }

    render() {
        let cart;
        let content;
        cart = JSON.parse(localStorage.getItem('wishlist'));
        if (cart.length === 0) {
            content = (<h1 style={{ textAlign: "center", verticalAlign: "middle" }}>Wishlist Empty...</h1>);
        }
        else {
            content = this.state.wishlist.map(ele => {
                return (
                    <div key={ele.id}>
                        <label>Title - </label>{ele.title}<br />
                        <button onClick={(event) => this.removeHandler(event, ele.id)}>Remove</button>
                        <button onClick={(event) => this.addToCartHandler(event, ele.id)}>Add to Cart</button>
                    </div>
                )
            })
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}





