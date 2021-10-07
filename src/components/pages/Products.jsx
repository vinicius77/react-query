import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProducts = () => axios.get('http://localhost:4000/products');

const Products = () => {
	const { data, error, isLoading } = useQuery('products', fetchProducts);

	return (
		<div>
			<h2>Products with RQ</h2>
			{isLoading && <div>Loading ...</div>}
			{error && <div>{error}</div>}

			{data?.data &&
				data.data.map((product) => <h3 key={product._id.$oid}>{product.product_name}</h3>)}
		</div>
	);
};

export default Products;