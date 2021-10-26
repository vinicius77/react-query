import axios from 'axios';
import { useQuery } from 'react-query';

const fetchData = async (url) => {
	return await axios.get(url);
};

export const useFetchData = (args) => {
	const { url, queryId, ...rest } = args;

	return useQuery(queryId, () => fetchData(url), {
		...rest,
	});
};
