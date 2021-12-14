import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import React from 'react';
import { getProductById, getProductCategoryById } from '../apis/productApis';

export const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState({
    name: '',
    price: 0,
    category: {
      name: '',
    },
  });
  const [category, setCategory] = React.useState({
    name: '',
  });
  React.useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data.data);
        getProductCategoryById(id)
          .then((res) => {
            setCategory(res.data.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          border: `1px solid #ccc`,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant='body2'>
              Tên sản phẩm: {product.name}
            </Typography>
            <Typography variant='body2'>Danh mục: {category?.name}</Typography>
            <Typography variant='caption'>Giá: {product.price}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};
