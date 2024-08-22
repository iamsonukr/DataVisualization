import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const ProductsDash = () => {
  const [productData, setProductData] = useState([])

  const getProductData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shopify/products')
      setProductData(response.data.data || [])
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching customer data:", error)
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

  return (
    <div>ProductsDash</div>
  )
}

export default ProductsDash