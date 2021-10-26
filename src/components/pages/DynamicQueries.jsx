import React from 'react';
import axios from 'axios';
import { useQueries } from 'react-query';

const fetchChars = async (id) => {
	return await axios.get(`http://localhost:4000/characters/${id}`);
};

const DynamicQueries = ({ charIds }) => {
	const resultsArr = useQueries(
		charIds.map((id) => {
			return {
				queryKey: ['chars', id],
				queryFn: () => fetchChars(id),
			};
		})
	);
	return (
		<div>
			<h2>Dynamic Queries</h2>
			<em>
				Check <code>console.log()</code>
			</em>
			{console.log(resultsArr)}
		</div>
	);
};

export default DynamicQueries;
