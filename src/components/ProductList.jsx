import { useEffect, useState } from "react";
import { api } from "../utils/api";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useSelector } from "react-redux";
import SlidingBanners from "./SlidingBanners";

import { toast } from "react-toastify";
import Spinner from "../Spinner";

import { FaSearch } from "react-icons/fa";


function useFetchProducts(url) {                                              // Custom hook to fetch data from the API

  const [productItems, setProductItems] = useState({ products: [] });         // state to hold fetched products

  const [showSpinner, setShowSpinner] = useState(false);                      // state to manage loading spinner visibility

  useEffect(() => {
    const fetchProducts = async () => {                                       // Fetching products asynchronously when the component mounts
      setShowSpinner(true);

      try{
        const response = await fetch(url);
        const output = await response.json();
        setProductItems(output);                                              // set fetched data in state
      }
      
      catch(error){
        console.error("Failed to fetch products:", error);
      }
      setShowSpinner(false);
    };

    fetchProducts();
  }, [url]);                                                                  // dependency array to re-fetch if `url` changes

  return { productItems, showSpinner };
}

function ProductList(){
    
  const {productItems, showSpinner} = useFetchProducts(api);                  // Destructuring product data and spinner state from custom hook

  // const [productItems, setProductItems] = useState({ products : [] });

  // let url = api;

  // const data = async () => {
  //     const response = await fetch(url);
  //     const output = await response.json();
        
  //     setProductItems(output);
  // }
  // useEffect(() => {
  //     data();
  // },[])

  console.log(productItems);

  const dispatch = useDispatch();                                             // initialize dispatch for Redux actions


  function handleClickAdd(productitem){
    dispatch(addToCart(productitem));                                         // dispatch action to add product to cart
    toast.success("Added to Cart");                                           // show toast notification for success
  }

  const cartItems = useSelector(store => store.cart.items);                   // Get current items in the cart from Redux store

  // const eachItem = productItems.products.map(item => item)
  // console.log("Each Item",eachItem)
  // const isInCart = cartItems.some(cartItem => cartItem.id == eachItem.id);
  // console.log(isInCart);
  // console.log("cartItems ->",cartItems);
    
  const [searchText, setSearchText] = useState('');
  const [filteredProduct,setFilteredProduct] = useState(null);

  function handleClickSearch(){
    const filteredItem = productItems.products.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    ) 
    setFilteredProduct(filteredItem);
  }

  const displayedProduct = filteredProduct || productItems.products;          // Display either the filtered products or all products if no search is applied

  return (
    <>
    <h1 className="cartHeader">Welcome</h1>
    <div className="search">
      <input className="searchInput" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by product name" />
      <button className="searchButton" onClick={handleClickSearch}><FaSearch /></button>
    </div>

    <SlidingBanners />
    {/* <img src="https://img.freepik.com/free-vector/happy-diwali-biggest-sale-offer-banner-with-lantern_1017-40374.jpg" alt="Image of Diwali Offer Banner" width="100%" height="250px" /> */}


    {
      showSpinner ? <Spinner /> :     // If takes time to fetch data, it show a spinner and a loading message

    


    <div className="productList">  
      {displayedProduct.map(item => {
        const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

        return (
          <div className="productInProductList" key={item.id}>
              <div>
                <Link to={`/productdetails/${item.id}`} className="cartSetLinkChild">
                  <ProductItem productItem={item} />
                  <h4 className="cartSetGrandChildh4">View Details</h4>
                </Link>
                <button onClick={() => handleClickAdd(item)} disabled={isInCart} className="productListButtonChild">{isInCart ? "In Cart" : "Add to Cart"}</button>
              </div>
          </div>
        );
        })}
      </div>
    }
    </>
  )
}
  
export default ProductList;