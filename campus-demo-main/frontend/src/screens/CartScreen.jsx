// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Form,
//   Button,
//   Card,
// } from 'react-bootstrap';
// import { FaTrash } from 'react-icons/fa';
// import Message from '../components/Message';
// import { addToCart, removeFromCart } from '../slices/cartSlice';

// const CartScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   // NOTE: no need for an async function here as we are not awaiting the
//   // resolution of a Promise
//   const addToCartHandler = (product, qty) => {
//     dispatch(addToCart({ ...product, qty }));
//   };

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     navigate('/login?redirect=/shipping');
//   };

//   return (
//     <Row>
//       <Col md={8}>
//         <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
//         {cartItems.length === 0 ? (
//           <Message>
//             Your cart is empty <Link to='/'>Go Back</Link>
//           </Message>
//         ) : (
//           <ListGroup variant='flush'>
//             {cartItems.map((item) => (
//               <ListGroup.Item key={item._id}>
//                 <Row>
//                   <Col md={2}>
//                     <Image src={item.image} alt={item.name} fluid rounded />
//                   </Col>
//                   <Col md={3}>
//                     <Link to={`/product/${item._id}`}>{item.name}</Link>
//                   </Col>
//                   <Col md={2}>₹{item.price}</Col>
//                   <Col md={2}>
//                     <Form.Control
//                       as='select'
//                       value={item.qty}
//                       onChange={(e) =>
//                         addToCartHandler(item, Number(e.target.value))
//                       }
//                     >
//                       {[...Array(item.countInStock).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Col>
//                   <Col md={2}>
//                     <Button
//                       type='button'
//                       variant='light'
//                       onClick={() => removeFromCartHandler(item._id)}
//                     >
//                       <FaTrash />
//                     </Button>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Col>
//       <Col md={4}>
//         <Card>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>
//                 Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                 items
//               </h2>
//               $
//               {cartItems
//                 .reduce((acc, item) => acc + item.qty * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Button
//                 type='button'
//                 className='btn-block'
//                 disabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed To Checkout
//               </Button>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default CartScreen;

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div
      style={{
        background: '#f8f9fa',
        minHeight: 'calc(100vh - 100px)',
        padding: '30px',
      }}
    >
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <h1
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '2.5rem',
              color: '#333',
            }}
          >
            Shopping Cart
          </h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item._id}
                  style={{
                    border: '1px solid #ddd',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='align-self-center'>
                      <Link
                        to={`/product/${item._id}`}
                        style={{ color: '#333', textDecoration: 'none' }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className='align-self-center'>
                      ₹{item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} className='align-self-center'>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card style={{ border: 'none', borderRadius: '10px' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  borderRadius: '10px 10px 0 0',
                }}
              >
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                <h3>
                  ₹
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  style={{
                    backgroundColor: '#933C87',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                  }}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
