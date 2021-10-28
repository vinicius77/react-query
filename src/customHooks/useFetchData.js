import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const fetchData = async (url) => {
	return await axios.get(url);
};

export const useFetchData = (args) => {
	const { url, queryId, ...rest } = args;

	return useQuery(queryId, () => fetchData(url), {
		...rest,
	});
};

/** Mutation Section */
const createProduct = async (product) => {
	return axios.post('http://localhost:4000/products', product);
};

export const useCreateProduct = () => {
	return useMutation(createProduct);
};
