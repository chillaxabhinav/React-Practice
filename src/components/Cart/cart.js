import React, { Component } from 'react';
import styles from './cart.module.css';

export default class Cart extends Component {

    state = {
        cart : []
    }

    componentDidMount(){
        let cart = JSON.parse(localStorage.getItem('cart'));
        this.setState({
            cart : cart
        });
    }

    decrementHandler = (e, id) => {
        let cart;
        cart = JSON.parse(localStorage.getItem('cart'));
        let myItem = cart.find(ele => ele.id === id);
        let quantity = myItem.quantity;
        console.log(myItem, quantity);
        if(myItem.quantity === 1){
            localStorage.removeItem('cart');
            let newCart = cart.filter(ele => ele.id!==id);
            console.log(newCart);
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
        else if (myItem.quantity >= 2) {
            localStorage.removeItem('cart');
            myItem = {
                ...myItem,
                quantity : myItem.quantity--
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        this.componentDidMount();
    }

    incrementHandler = (e, id) => {
        let cart;
        cart = JSON.parse(localStorage.getItem('cart'));
        let myItem = cart.find(ele => ele.id === id);
        myItem = {
            ...myItem,
            quantity : myItem.quantity++
        }
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cart));
        this.componentDidMount();
    }

    render() {
        let cart;
        let content;
        cart = JSON.parse(localStorage.getItem('cart'));
        if(cart.length === 0){
            content = (<h1 style={{textAlign : "center", verticalAlign : "middle"}}>Cart Empty...</h1>);
        }
        else{
            content = this.state.cart.map(ele => {
                        return (
                                <div key={ele.id} style={styles.ItemContainer}>
                                    <label>Title - {ele.title}</label><br />
                                    <label>Quantity - {ele.quantity}   </label>
                                    <label>Increase Quantity </label><button onClick={(event) => this.incrementHandler(event, ele.id)}>+</button>
                                    <label>Decrease Quantity </label><button onClick={(event) => this.decrementHandler(event, ele.id)}> - </button>
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




