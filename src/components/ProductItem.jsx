function ProductItem(props){                  // Define a functional component named ProductItem that receives props as an argument

  let productItem = props.productItem;        // Storing the data into a local variable which came from the Product List Parent Component 

  return (
    <>
      <div>
        <img src={productItem.thumbnail} alt={`Image of ${productItem.title}`} width="100%px" height="40%" />
        <h3>{productItem.title}</h3> 
        <h4>${productItem.price}</h4>
      </div>
    </>
  )
}
  
export default ProductItem;