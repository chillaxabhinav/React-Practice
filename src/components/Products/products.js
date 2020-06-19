import {Component} from 'react';
import React from 'react';

import Card from '../Card/card';

import styles from './product.module.css';

import axios from 'axios';


class Products extends Component {
    state = {
        products : [],
        loading : false,
        filter : false,
        productsShown : [],
        productPerPage : 5,
        pageNumber : 1,
        itemstoShow : 5,
        start : 0
    }

    componentDidMount(){
        if(!this.state.loading){
            this.setState((prevState) => {
                return {
                    loading : !prevState.loading,
                    filter : false,
                    pageNumber : 1
                }
            });
        }
        axios.get('https://jsonplaceholder.typicode.com/albums')
            .then(response => {
                const data = response.data;
                return data;
            })
            .then(result => {
                const tenProducts = [];
                for(let i=0;i < 10; i++){
                    tenProducts.push(result[i]);
                }
                this.setState((prevState) => {
                    return {
                        products: tenProducts,
                        loading: !prevState.loading,
                        filter : false,
                        pageNumber : 1
                    }
                });
                console.log('State set');
            })
            .catch(err => {
                console.log(err);
            })
    }

    compare(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        let comparison = 0;
        if (titleA > titleB) {
            comparison = 1;
        } else if (titleA < titleB) {
            comparison = -1;
        }
        return comparison;
    }
    
    onCheckChanged(e){
        const eventChecked = e.target.checked;
        let filterProducts;
        if(!this.state.filter){
            this.setState((prevState) => {
                filterProducts = prevState.products.slice();
                filterProducts.sort(this.compare);
                return {
                    products : filterProducts,
                    filter : eventChecked
                }
            });
        }
        else{
            this.componentDidMount();
        }
    }

    onAddToCart = (e, id) => {
        const myData = localStorage.getItem('cart');
        let myItemInCart;
        if(myData){
            const data = JSON.parse(myData);
            localStorage.removeItem('cart');
            myItemInCart = data.find(ele => ele.id === id);
            if(myItemInCart){
                myItemInCart.quantity++;
            }
            localStorage.setItem('cart',JSON.stringify(data));
        }
        if(!myItemInCart && myData){
            const data = JSON.parse(myData);
            localStorage.removeItem('cart');
            let myItem = this.state.products.find(ele => ele.id === id);
            let updatedItem = {
                ...myItem,
                quantity : 1
            }
            data.push(updatedItem);
            localStorage.setItem('cart', JSON.stringify(data));
            return;
        }
        if(myData === null){
            let cart = [];
            let myItem = this.state.products.find(ele => ele.id === id);
            let updatedItem = {
                ...myItem,
                quantity: 1
            }
            cart.push(updatedItem);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
    }

    onAddToWishlist(e, id){
        const myData = localStorage.getItem('wishlist');
        let myItemInCart;
        if (myData) {
            const data = JSON.parse(myData);
            console.log(data);
            myItemInCart = data.find(ele => ele.id === id);
            if(myItemInCart){
                return;
            }
            else{
                localStorage.removeItem('wishlist');
                let myItem = this.state.products.find(ele => ele.id === id);
                data.push(myItem);
                localStorage.setItem('wishlist', JSON.stringify(data));
                return;
            }
        }
        else {
            let wishlist = [];
            let myItem = this.state.products.find(ele => ele.id === id);
            wishlist.push(myItem);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }

    pageChangeHandler = (e, id) => {
        let something = this.state.productPerPage * (id-1);
        let toBeShown = this.state.products.length - something;
        let final;
        if(toBeShown > this.state.productPerPage){
            final = this.state.productPerPage;
        }
        else{
            final = toBeShown;
        }
        this.setState({
            pageNumber : id,
            itemstoShow : final,
            start : something
        });
    }

    render() {

        const numberOfPages = Math.ceil(this.state.products.length / this.state.productPerPage);
        let helper = [];
        for(let i=0; i< numberOfPages; i++){
            helper.push(i+1);
        }


        let content;
        if(this.state.loading){
            content = (
                <h1 style={{textAlign : "center", verticalAlign : "middle"}}>Loading...</h1>
            )
        }
        else{
            let myarr = this.state.products.slice(this.state.start, this.state.start + this.state.itemstoShow);
            content = (<div>
                    {myarr.map(ele => {
                        return (
                            <div key={ele.id} className={styles.perCard}>
                                <Card title={ele.title} cardId={ele.id} onAddToCart={(event) => this.onAddToCart(event, ele.id)} onAddToWishlist={(event) => this.onAddToWishlist(event, ele.id)} />
                            </div>
                        )
                    })}
            </div>)
        }
        return (
            <section>
                <h1 style={{textAlign:"center"}}>Products</h1>
                <div className={styles.filter}>
                    <label>Filter - </label><input type="checkbox" name="titleFilter" checked={this.state.filter} onChange={(event) => this.onCheckChanged(event)} /> Title Name
                </div>
                {content}
                <div style={{textAlign : "center"}} className={styles.paginate}>
                    {helper.map((ele) => {
                        return (
                            <button key={ele} onClick={(event) => this.pageChangeHandler(event, ele)}>{ele}</button>
                        )
                    })}
                </div>
            </section>
            
        )
    }
}

export default Products;