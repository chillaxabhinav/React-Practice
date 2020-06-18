import {Component} from 'react';
import React from 'react';

import Card from '../Card/card';
import styles from './product.module.css';

import axios from 'axios';


class Products extends Component {
    state = {
        products : [],
        loading : false
    }

    componentDidMount(){
        if(!this.state.loading){
            this.setState({
                loading : true
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
                this.setState({
                    products : tenProducts,
                    loading : false
                });
                console.log('State set');
            })
            .catch(err => {
                console.log(err);
            })
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
                {content}
            </section>
        )
    }
}

export default Products;