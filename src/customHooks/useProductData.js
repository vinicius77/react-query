import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

/** Initial (Query) Data ("products" queryId) */

const fetchData = async ({ queryKey }) => {
	const id = queryKey[1];
	return await axios.get(`http://localhost:4000/products/${id}`);
};

export const useProductData = (id) => {
	const queryClient = useQueryClient();
	return useQuery(['product', id], fetchData, {
		initialData: () => {
			const product = queryClient
				.getQueryData('products') // the query id from the list (products)
				?.data?.find((product) => product.id === parseInt(id));

			return product ? product : null;
		},
	});
};
