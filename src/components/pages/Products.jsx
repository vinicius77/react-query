import React from 'react';
import { useFetchData } from '../../customHooks/useFetchData';
import { Link } from 'react-router-dom';
const onSuccess = (data) => console.log(data.length); // select affects the way onSuccess works
const onError = (error) => console.log(error.message);

/*const select = ({ data }) => {
	const productNamesArray = data.map((product) => product.product_name);
	return productNamesArray;
};*/

const options = {
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
	//select, // Transform data example
	url: 'http://localhost:4000/products',
	queryId: 'products',
};

const Products = () => {
	const { data, error, isLoading, refetch, isFetching } = useFetchData(options);

	return (
		<div>
			<h2>Products with RQ</h2>

			{(isLoading || isFetching) && <div>Loading ...</div>}
			{error && <div>{error.message}</div>}

			{data?.data &&
				data.data.map((product) => (
					<div key={product.id}>
						<Link to={`/products/${product.id}`}>{product.product_name}</Link>
					</div>
				))}
			{/** TRANSFORM: Possible only because of select callback */}
			{/*data?.map((productName) => (
				<div key={productName}>{productName}</div>
			))*/}
			<button onClick={() => refetch()} disabled={isFetching}>
				Fetch Data On Click
			</button>
		</div>
	);
};

export default Products;
