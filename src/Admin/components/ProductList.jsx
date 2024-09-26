import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import "./ProductList.css"

function ProductList() {
    const [products,setProducts] = useState([]);
    const [editId,setEditId] = useState(null);
    const [editData,setEditData] = useState({
      pname:"",
      brandname:"",
      des:"",
      price:"",
      img:""
    })

    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
               const response = await axios(`${process.env.REACT_APP_API_URL}/api/product/GetProduct`)
                // console.log(response);
                setProducts(response.data)
            }catch(err){
                console.error("Error in Fetching Product",err);
                
            }
        }
        fetchProduct();
    },[])

    const handleDelete = async(id)=>{
        try{
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/product/DeleteProduct/${id}`)
          alert("Product Deleted Successfully...");
          setProducts(()=>{
            return products.filter(val=> val._id !== id)
          })
        }catch(err){
          console.error("Error in Deleting Product",err);
        }
    }

    const handleEdit = async(val)=>{
      setEditId(val._id);
      setEditData({
        pname:val.pname,
        brandname:val.brandname,
        des:val.des,
        price:val.price,
        img:val.img
      })
    }

    const handleUpdate = async()=>{
      try{
        await axios.put(`${process.env.REACT_APP_API_URL}/api/product/UpdateData/${editId}`,editData);
        alert("Data Update Successfully...");

        setProducts(products.map((val)=>{
          if(val._id === editId){
            return {...val,...editData};
          }
          return val;
        }))
        setEditId(null)
      }catch(err){
        console.error("Error in Data Update...",err);
        
      }
    }
  return (
    <div className="product-list">
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            {editId === product._id ? (
                                <>
                                    <td>{product._id}</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={editData.pname} 
                                            onChange={(e) => setEditData({ ...editData, pname: e.target.value })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={editData.brandname} 
                                            onChange={(e) => setEditData({ ...editData, brandname: e.target.value })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={editData.des} 
                                            onChange={(e) => setEditData({ ...editData, des: e.target.value })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={editData.price} 
                                            onChange={(e) => setEditData({ ...editData, price: e.target.value })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={editData.img} 
                                            onChange={(e) => setEditData({ ...editData, img: e.target.value })} 
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Save</button>
                                        <button onClick={() => setEditId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{product._id}</td>
                                    <td>{product.pname}</td>
                                    <td>{product.brandname}</td>
                                    <td>{product.des}</td>
                                    <td>{product.price}</td>
                                    <td><img src={product.img} alt={product.pname} className="product-image" /></td>
                                    <td>
                                        <button onClick={() => handleEdit(product)}>Edit</button>
                                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default ProductList