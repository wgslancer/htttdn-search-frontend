import { SearchOutlined } from '@mui/icons-material';
import {
  TextField,
  debounce,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProductsByName } from '../apis/productApis';

export const Homepage = () => {
  const [products, setProducts] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const fetchProducts = (value) => {
    setLoading(true);
    searchProductsByName(value)
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const debounceDropdownSearch = useCallback(
    debounce((nextValue) => fetchProducts(nextValue), 500),
    []
  );
  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    debounceDropdownSearch(e.target.value);
  };
  const handleOnClickProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ minWidth: '400px' }}>
        <TextField
          onChange={handleOnChange}
          value={searchText}
          placeholder='Nhập tên sản phẩm để tìm kiếm'
          fullWidth
          sx={{ marginBottom: '8px' }}
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  marginRight: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {loading ? <CircularProgress size={24} /> : <SearchOutlined />}
              </Box>
            ),
          }}
        />
        {products.length > 0 && (
          <Box sx={{ cursor: 'pointer' }}>
            {products.map((product) => {
              return (
                <Box
                  key={product.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px',
                    border: `1px solid #ccc`,
                    borderRadius: '4px',
                  }}
                  onClick={() => handleOnClickProduct(product.id)}
                >
                  <Typography variant='body2'>
                    Tên sản phẩm: {product.name}
                  </Typography>
                  <Typography variant='caption'>
                    Giá: {product.price}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};
