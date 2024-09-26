import axios from 'axios'
import React, { useState } from 'react'
import "./AddProduct.css"

function AddProduct() {
    const [productData,setProductData] = useState({
        pname : "",
        brandname:"",
        des:"",
        price:"",
        img:""
    })

    const handleChange = (e)=>{
        setProductData({...productData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/api/product/AddProduct`,productData)
        .then(res=>{
            alert("Product Added Successfully...");
            setProductData({
                pname : "",
                brandname:"",
                des:"",
                price:"",
                img:""
            });
        })
        .catch(err=>{
            console.error("Some Error in Add Product",err);
        })
    }

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" name="pname" value={productData.pname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Brand Name:</label>
          <input type="text" name="brandname" value={productData.brandname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="des" value={productData.des} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" name="img" value={productData.img} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct