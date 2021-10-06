import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { camelizeKeys } from 'humps';

const initialState = {
	products: [],
	error: '',
	isLoading: false,
};

const RQProducts = () => {
	const [data, setData] = useState(initialState);

	const fetchProducts = async () => {
		setData((prevData) => {
			return { ...prevData, isLoading: true };
		});

		try {
			const result = await axios.get('http://localhost:4000/products');
			const { data } = await result;

			setData(() => {
				return { isLoading: false, error: null, products: camelizeKeys(data) };
			});
		} catch (error) {
			setData(() => {
				return {
					products: [],
					isLoading: false,
					error: 'Error Fetching',
				};
			});
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<h3>Normal Fetching</h3>
			{data.error && <h4>{data.error}</h4>}
			{data.isLoading && <h4>Loading ...</h4>}
			{data.products?.map((product) => {
				return <div key={product.id.$oid}>{product.productName}</div>;
			})}
		</div>
	);
};

export default RQProducts;
