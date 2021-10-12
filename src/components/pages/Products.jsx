import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProducts = () => axios.get('http://localhost:4000/poducts');
const onSuccess = (data) => console.log(data.data.length);
const onError = (error) => console.log(error.message);

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
	});

	return (
		<div>
			<h2>Products with RQ</h2>
			{(isLoading || isFetching) && <div>Loading ...</div>}
			{error && <div>{error.message}</div>}

			{data?.data &&
				data.data.map((product) => <h3 key={product._id.$oid}>{product.product_name}</h3>)}
			<button onClick={() => refetch()} disabled={isFetching}>
				Fetch Data On Click
			</button>
		</div>
	);
};

export default Products;
