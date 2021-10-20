import axios from 'axios';
import { useQuery } from 'react-query';

const fetchData = async ({ queryKey }) => {
	const id = queryKey[1];
	return await axios.get(`http://localhost:4000/products/${id}`);
};

export const useProductData = (id) => {
	return useQuery(['product', id], fetchData);
};
