import {Component} from 'react';
import React from 'react';

import Card from '../Card/card';

import styles from './product.module.css';

import axios from 'axios';


class Products extends Component {
    state = {
        products : [],
        loading : false,
        filter : false
    }

    componentDidMount(){
        if(!this.state.loading){
            this.setState((prevState) => {
                return {
                    loading : !prevState.loading,
                    filter : false
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
                        filter : false
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

    render() {
        let content;
        if(this.state.loading){
            content = (
                <h1 style={{textAlign : "center", verticalAlign : "middle"}}>Loading...</h1>
            )
        }
        else{
            content = (<div>
                            {this.state.products.map((ele) => {
                                return (
                                    <div className={styles.perCard} key={ele.id}>
                                        <Card title={ele.title} cardId={ele.id} />
                                    </div>
                                )
                            })}
                        </div>)
        }
        return (
            <section>
                <div className={styles.searchBar}>
                    <label style={{ fontWeight: "bold", fontSize: "1.2rem", verticalAlign: "middle" }}>Search - </label><input type="text" className={styles.search}></input>
                </div>
                <h1 style={{textAlign:"center"}}>Products</h1>
                <div className={styles.filter}>
                    <label>Filter - </label><input type="checkbox" name="titleFilter" checked={this.state.filter} onChange={(event) => this.onCheckChanged(event)} /> Title Name
                </div>
                {content}
            </section>
        )
    }
}

export default Products;