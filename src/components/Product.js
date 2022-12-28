import React from 'react'
import "../style/Product.css"

const Product = (props) => {
console.log(props)
  return (
    <tr className="items">
        <td>{props.index + 1}</td>
        <td>{props.item.title}</td>
        <td>{props.item.brand}</td>
        <td>{props.item.description.length > 40 ? `${props.item.description.slice(0,40)}...` : props.item.description}</td>
        <td>{props.item.price}</td>
        <td>{props.item.rating}</td>
        <td>{props.item.stock}</td>
    </tr>
  )
}

export default Product