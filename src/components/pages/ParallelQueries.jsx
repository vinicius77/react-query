import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCharacters = async () => {
	return await axios.get('http://localhost:4000/characters');
};

const fetchProducts = async () => {
	return await axios.get('http://localhost:4000/products');
};

const divStyle = {
	display: 'flex',
	width: '100%',
	height: '100vh',
	background: '#e0e0e0',
	justifyContent: 'space-evenly',
};

const ParallelQueries = () => {
	const { error, isLoading, data } = useQuery('characters', fetchCharacters);
	const { error: hasError, isLoading: loading, data: prod } = useQuery('products', fetchProducts);

	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Parallel Queries</h2>
			<div style={divStyle}>
				<div>
					<h3>Products</h3>
					{hasError && <div>{hasError.message}</div>}
					{loading && <div>Loading Products...</div>}
					<div className="products">
						{prod?.data.map((prod) => (
							<ul key={prod.id}>
								<li>{prod.product_name}</li>
								<li>{prod.unit_cost}</li>
								<li>{prod.quantity}</li>
							</ul>
						))}
					</div>
				</div>
				<div>
					<h3>Characters</h3>
					{error && <div>{error.message}</div>}
					{isLoading && <div>Loading...</div>}
					{data?.data.map((char) => (
						<ul key={char.id}>
							<li>{char.name}</li>
							<li>{char.item}</li>
						</ul>
					))}
				</div>
			</div>
		</div>
	);
};

export default ParallelQueries;
