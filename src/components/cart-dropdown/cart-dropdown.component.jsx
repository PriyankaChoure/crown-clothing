
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';


const CartDropdown = () => {
    return ( 
        <div className='cart-dropdown-container'>
            <div className='cart-item' ></div>
            <Button>go to checkout</Button>
        </div>
    );

}

export default CartDropdown;