import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductData } from '../../customHooks/useProductData';

export const RQProduct = () => {
	const { id } = useParams();

	const { error, isLoading, data } = useProductData(id);

	return (
		<div>
			<h2>Products Details</h2>
			<Link to="/products">Back</Link>
			{isLoading && <h3>Loading ...</h3>}
			{error && <h3>{error.message}</h3>}
			{data?.data && (
				<div key={data.data.id}>
					<h4>{data.data.product_name}</h4>
					<p>{data.data.supplier}</p>
					<p>{data.data.quantity}</p>
					<p>{data.data.unit_cost}</p>
				</div>
			)}
		</div>
	);
};
