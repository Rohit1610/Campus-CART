// import { Link } from 'react-router-dom';
// import { Carousel, Image } from 'react-bootstrap';
// import Message from './Message';
// import { useGetTopProductsQuery } from '../slices/productsApiSlice';

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();

//   return isLoading ? null : error ? (
//     <Message variant='danger'>{error?.data?.message || error.error}</Message>
//   ) : (
//     <Carousel pause='hover' className='bg-primary mb-4'>
//       {products.map((product) => (
//         <Carousel.Item key={product._id}>
//           <Link to={`/product/${product._id}`}>
//             <Image src={product.image} alt={product.name} fluid />
//             <Carousel.Caption className='carousel-caption'>
//               <h2 className='text-white text-right'>
//                 {product.name} (₹{product.price})
//               </h2>
//             </Carousel.Caption>
//           </Link>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// };

// export default ProductCarousel;

import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const carouselStyle = {
    background:
      'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
  };

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4' style={carouselStyle}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (₹{product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
