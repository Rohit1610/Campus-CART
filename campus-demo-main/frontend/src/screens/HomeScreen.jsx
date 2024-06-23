// // import { Row, Col } from 'react-bootstrap';
// // import { useParams } from 'react-router-dom';
// // import { useGetProductsQuery } from '../slices/productsApiSlice';
// // import { Link } from 'react-router-dom';
// // import Product from '../components/Product';
// // import Loader from '../components/Loader';
// // import Message from '../components/Message';
// // import Paginate from '../components/Paginate';
// // import ProductCarousel from '../components/ProductCarousel';
// // import Meta from '../components/Meta';
// // import '../styles/HomeScreen.css';

// // const HomeScreen = () => {
// //   const { pageNumber, keyword } = useParams();

// //   const { data, isLoading, error } = useGetProductsQuery({
// //     keyword,
// //     pageNumber,
// //   });

// //   return (
// //     <>
// //       {!keyword ? (
// //         <ProductCarousel />
// //       ) : (
// //         <Link to='/' className='btn btn-light mb-4'>
// //           Go Back
// //         </Link>
// //       )}
// //       {isLoading ? (
// //         <Loader />
// //       ) : error ? (
// //         <Message variant='danger'>
// //           {error?.data?.message || error.error}
// //         </Message>
// //       ) : (
// //         <>
// //           <Meta />
// //           <h1>Latest Products</h1>
// //           <Row>
// //             {data.products.map((product) => (
// //               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
// //                 <Product product={product} />
// //               </Col>
// //             ))}
// //           </Row>
// //           <Paginate
// //             pages={data.pages}
// //             page={data.page}
// //             keyword={keyword ? keyword : ''}
// //           />
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default HomeScreen;

// import { Row, Col } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { useGetProductsQuery } from '../slices/productsApiSlice';
// import { Link } from 'react-router-dom';
// import Product from '../components/Product';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import Paginate from '../components/Paginate';
// import ProductCarousel from '../components/ProductCarousel';
// import Meta from '../components/Meta';

// const HomeScreen = () => {
//   const { pageNumber, keyword } = useParams();

//   const { data, isLoading, error } = useGetProductsQuery({
//     keyword,
//     pageNumber,
//   });

//   return (
//     <div className='home-screen-container'>
//       {' '}
//       {/* Add a container div */}
//       {!keyword ? (
//         <ProductCarousel />
//       ) : (
//         <Link to='/' className='btn btn-light mb-4'>
//           Go Back
//         </Link>
//       )}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant='danger'>
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <>
//           <Meta />
//           <h1>Latest Products</h1>
//           <Row>
//             {data.products.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row>
//           <Paginate
//             pages={data.pages}
//             page={data.page}
//             keyword={keyword ? keyword : ''}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default HomeScreen;

import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const containerStyle = {
    background: 'linear-gradient(315deg, #0ED7DC, #933C87)', // Linear gradient background
    minHeight: '100vh', // Ensure the gradient covers the entire screen
  };

  return (
    <div style={containerStyle}>
      {' '}
      {/* Apply inline style */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
