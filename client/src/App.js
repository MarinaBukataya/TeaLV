import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import AddProduct from "./pages/addProduct/AddProduct";
import AddCategory from "./pages/addCategory/AddCategory";
import Cart from "./pages/cart/Cart";
import ViewProduct from "./pages/viewProduct/ViewProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="/add_category" exact component={AddCategory} />
          <Route path="/add_product" exact component={AddProduct} />
          <Route path="/edit_product/:id" exact component={AddProduct} />
          <Route path="/view_product/:id" exact component={ViewProduct} />
          <Route path="/shopping_cart" exact component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
