import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProducts = () => axios.get('http://localhost:4000/products');
const onSuccess = (data) => console.log(data.length); // select affects the way onSuccess works
const onError = (error) => console.log(error.message);
const select = ({ data }) => {
	const productNamesArray = data.map((product) => product.product_name);
	return productNamesArray;
};

const Products = () => {
	const { data, error, isLoading, refetch, isFetching } = useQuery('products', fetchProducts, {
		/*cacheTime: 3500, // default 5min
		staleTime: 30000, // default 0 sec
		refetchOnMount: 'always', // default true
		refetchOnWindowFocus: true, // refetch when the changes, for example
		// Polling settings
		refetchInterval: 60000,
		refetchIntervalInBackground: true, // Background Refetching*/
		// useQueryOnClick
		enabled: false,
		// Callbacks
		onSuccess,
		onError,
		select, // Transform data example
	});

	return (
		<div>
			<h2>Products with RQ</h2>
			{(isLoading || isFetching) && <div>Loading ...</div>}
			{error && <div>{error.message}</div>}

			{/*data?.data &&
				data.data.map((product) => <h3 key={product._id.$oid}>{product.product_name}</h3>)*/}
			{/** TRANSFORM: Possible only because of select callback */}
			{data?.map((productName) => (
				<div key={productName}>{productName}</div>
			))}
			<button onClick={() => refetch()} disabled={isFetching}>
				Fetch Data On Click
			</button>
		</div>
	);
};

export default Products;
