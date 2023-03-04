import edit from '../lib/icons/edit.png';
import trash from '../lib/icons/trash.png';

const Product = ({product}) => {

    return (
        <tr>
            <td className="store-td">{product.product_name}</td>
            <td>{product.product_weight}</td>
            <td>${product.product_price}</td>
            <td>${product.product_discountprice}</td>
            <td>{product.product_qty}</td>
            <td>
                <img className='icons' src={edit} alt='edit-icon' id={product.product_id} onClick={(e) => console.log(e.target.id)}></img>
            </td>
            <td>
                <img className='icons' src={trash} alt='trash-icon' id={product.product_id} onClick={(e) => console.log(e.target.id)}></img>
            </td>
        </tr>
    )
};

export default Product;