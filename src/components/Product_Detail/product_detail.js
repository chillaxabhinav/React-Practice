import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

import Card from '../Card/card';

import styles from './product_detail.module.css';

const ProductDetail = (props) => {
    const [currentState, setState] = useState({
        productData : {},
        loading : false
    });
    useEffect(() => {
        setState({
            productData: {},
            loading : true
        });
        const fetchProduct = async () => {
            try{
                const product = await axios.get(`https://jsonplaceholder.typicode.com/albums/${props.match.params.id}`);
                const productData = await product.data;
                setState({
                    productData : productData,
                    loading : false
                });
            }
            catch{
                return (
                    <h1 style={{textAlign :"center", verticalAlign : "middle"}}>Error Occured</h1>
                )
            }
        }
        fetchProduct();
    }, []);
    
    if(currentState.loading){
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Product Detail</h1>
                <h1 style={{ textAlign: "center", verticalAlign: "middle" }}>Loading...</h1>
            </div>
        )
    }
    
    else{
        return (
            <div className={styles.outer}>
                <h1 style={{ textAlign: "center" }}>Product Detail</h1>
                <div className={styles.myCard}>
                    <Card title={currentState.productData.title} />
                </div>
            </div>
        )
    }
}

export default ProductDetail;