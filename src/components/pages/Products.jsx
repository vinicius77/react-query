import React, { useState } from 'react';
import { useFetchData, useCreateProduct } from '../../customHooks/useFetchData';
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

const product = {
	product_name: 'product name',
	supplier: 'supplier',
	quantity: 0,
	unit_cost: '$100',
};

const Products = () => {
	const { data, error, isLoading, refetch, isFetching } = useFetchData(options);
	const [prod, setProd] = useState(product);
	const { mutate, isError, isLoading: loading } = useCreateProduct();

	const onChangeHandler = ({ target }) => {
		setProd((prod) => {
			return { ...prod, [target.name]: target.value };
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		let id = Math.floor(((Math.random() * 205) / Math.random()) * 10 * 100);
		mutate({ ...prod, id });

		setProd(product);
	};

	return (
		<div>
			<h2>Products with RQ</h2>

			{(isLoading || isFetching) && <div>Loading ...</div>}
			{error && <div>{error.message}</div>}
			<div>
				{isError && <p>Something Went Wrong</p>}
				{loading && <p>Sending ...</p>}
				<form>
					<div className="form-control">
						<label>Product Name</label>
						<input
							type="text"
							name="product_name"
							value={prod.product_name}
							onChange={(event) => onChangeHandler(event)}
						/>
					</div>
					<div className="form-control">
						<label>Supplier</label>
						<input
							type="text"
							name="supplier"
							value={prod.supplier}
							onChange={(event) => onChangeHandler(event)}
						/>
					</div>
					<div className="form-control">
						<label>Quantity</label>
						<input
							type="number"
							name="quantity"
							value={prod.quantity}
							onChange={(event) => onChangeHandler(event)}
						/>
					</div>
					<div className="form-control">
						<label>Unit Cost</label>
						<input
							type="text"
							name="unit_cost"
							value={prod.unit_cost}
							onChange={(event) => onChangeHandler(event)}
						/>
					</div>
				</form>
				<button type="submit" onClick={onSubmit}>
					Send
				</button>
			</div>

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
