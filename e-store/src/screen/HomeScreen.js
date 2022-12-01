//import React, { useReducer } from 'react'
import { useEffect, useReducer , useState } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../component/Product'
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox'
import MessageBox from '../component/MessageBox'
//import LoadingBox from '../component/LoadingBox'
//import MessageBox from "../components/MessageBox";
//import logger from 'use-reducer-logger'
//import data from '../data'

const reducer = (state, action) =>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
      default:
        return state;
  }
};

const HomeScreen = () => {
    const [{loading, error, products}, dispatch] =useReducer(reducer, {
           products: [],
           loading: true,
           error: "",
    });

  //const [products, setProducts] = useState([]);
  useEffect(() =>{
     const fetchData = async () =>{
      dispatch({type: "FETCH_REQUEST"})
     
      try{
        const result =await axios.get("/api/products");
        dispatch({ type:  "FETCH_SUCCESS", payload: result.data})
      } catch(err){
        dispatch({ type: "FETCH_FAIL", payload: err.message })
      }
    
      //setProducts(result.data);
     };
     fetchData();
  }, []);
  return (
    
    <div>
      <Helmet>
    <title>Salon Store</title>
  </Helmet>
      <h1>Product</h1>   
     <div className='products'>
     {
        loading?(   
        <LoadingBox />
        ) 
        :
        error?(
          <MessageBox variant="danger">{error} </MessageBox>
        ):( 
          <Row>
        {products.map(product => (
          <Col key={product.slug}  sm={6} md={4} lg={3} className="mb-3">
         <Product product={product} />
          </Col>
        ))}
        </Row>
      )}
     </div>
    </div>
  );
}

export default HomeScreen
  