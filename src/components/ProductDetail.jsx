import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";

import { toast } from "react-toastify";

import { FaCartPlus } from "react-icons/fa";

function ProductDetails() {
  const params = useParams();                           // Extracts the `id` parameter from the route URL
  const [product, setProduct] = useState(null);         // State to hold product details
  
  
  const url = api;

  const cartItems = useSelector((store) => store.cart.items);
  const isInCart = product && cartItems.some(cartItem => cartItem.id === product.id);     // Checking if the product is already in the cart

  const getProductDetails = async () => {               // Function to fetch product details based on the product ID from params
    try {
      const response = await fetch(`${url}/${params.id}`);
      const output = await response.json();
      setProduct(output);
    } 
    catch (error) {
      console.log("Error while getting the Details:", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [params.id]);

  // console.log(product);

  const dispatch = useDispatch();                      // dispatch actions

  const handleClickAddToCart = () => {
    // if(product && !isInCart) {                         // Check if product exists and is not already in the cart
      dispatch(addToCart(product));
      toast.success("Added to Cart");
    // }
  };


  const [searchText, setSearchText] = useState('');
  const [filteredProduct, setFilteredProduct] = useState(null);

  const handleClickSearch = () => {
    if (product) {
      const filteredItem = [product].filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProduct(filteredItem.length ? filteredItem[0] : null);             // Updating filteredProduct based on search
    }
  };

  const displayedProduct = filteredProduct || product;                              // Setting which product to display

  return (
    <>
      
      <div className="productDetails">
        {displayedProduct ? (
          <>
            <h1 className="productDetailsHeading">{displayedProduct.title}</h1>
            
            <div className="productDetailsSet">
              <img className="productDetailsSetImageChild" src={displayedProduct.thumbnail} alt={`Image of ${displayedProduct.title}`} width="400px" height="400px" />
              
              <div className="productDetailsSetChild">
                <br />
                <h2 className="productDetailsSetHeadingChild">Price : ${parseFloat(displayedProduct.price).toFixed(2)}</h2>
                <br />
                <h2 className="productDetailsSetHeadingChild">Discount Price : {displayedProduct.discountPercentage} %</h2>
                <br />
                <h2 className="productDetailsSetHeadingChild">Brand : {displayedProduct.brand}</h2>
                <br />
                <h2 className="productDetailsSetHeadingChild">Left : {displayedProduct.stock}</h2>
                <br />
                <h2 className="productDetailsSetHeadingChild">Rating : {displayedProduct.rating}</h2>
              </div>
            </div>

            <button className="productDetailsSetButtonChild" onClick={handleClickAddToCart} ><FaCartPlus /> Add to Cart</button>

            <br />
            <br />

            <h3>{displayedProduct.description}</h3>

            <br />
            
            <h4>Warranty Information : {displayedProduct.warrantyInformation}</h4>
            
            <br />

            <h4>Delivered : {displayedProduct.shippingInformation}</h4>
            
            <br />

            <h4>Availability Status : {displayedProduct.availabilityStatus}</h4>
            
            <br />
            
            {/* <h3>Order Quantity : {displayedProduct.minimumOrderQuantity}</h3>
            
            <br /> */}
            
            <h4>Return Policy : {displayedProduct.returnPolicy}</h4>
            
            <br />
            <br />

            <div>
              <h4>Reviews :</h4>
              {displayedProduct.reviews.map((review, index) => (
                <div key={index}>
                  <h4 className="productDetailsSetReviewsChild">{review.comment}</h4>
                  <h4 className="productDetailsSetReviewsChild">Rating : {review.rating} / 5</h4>
                  <br />
                </div>
              ))}
            </div>
            <br />
            <br />
          </>
        ) 
        : 
        (
          <p>Loading product details...</p>
        )}
      </div>
    </>
  );
}



export default ProductDetails;