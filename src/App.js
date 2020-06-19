import React from "react";
import "./App.css";
import Nav from './components/Navigation/navigation';
import Products from './components/Products/products';
import Product_Detail from './components/Product_Detail/product_detail';
import Cart from './components/Cart/cart';

import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
				<Nav/>
				<Switch>
					<Route path="/" exact component={Products}></Route>
                    <Route path="/cart" exact component={Cart}></Route>
                    <Route path="/:id" exact component={Product_Detail}></Route>
				</Switch>
                <button style={{
                    width : "4rem",
                    height : "4rem",
                    background : "orange",
                    color : "white",
                    borderRadius : "50%",
                    position : "fixed",
                    bottom : "30px",
                    right : '30px',
                    cursor : "pointer",
                    textDecoration : "none",
                }}><NavLink to="/cart" className="myFixButton">Cart</NavLink></button>
            </div>
        </BrowserRouter>
    );
}

export default App;
