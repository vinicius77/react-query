import { useQuery } from 'react-query';
import { useState } from 'react';
import axios from 'axios';

const fetchLanguages = async (pageNum) => {
	return await axios.get(`http://localhost:4000/languages/?_limit=2&_page=${pageNum}`);
};

const PaginatedQueries = () => {
	const [pageNum, setPageNum] = useState(1);

	const { isLoading, error, data } = useQuery(['lang', pageNum], () => fetchLanguages(pageNum), {
		keepPreviousData: true,
	});

	return (
		<div>
			<h1>Paginated Queries {pageNum}</h1>
			{error && <p>{error.message}</p>}
			{isLoading && <p>Loading...</p>}
			<ul style={{ minHeight: '15vh' }}>
				{data?.data.map(({ name, id }) => (
					<li key={id} style={{ fontSize: '22px', fontWeight: 'bold' }}>
						{name}
					</li>
				))}
			</ul>
			<div>
				<button onClick={() => setPageNum((pageNum) => pageNum - 1)} disabled={pageNum < 2}>
					Prev
				</button>
				<button onClick={() => setPageNum((pageNum) => pageNum + 1)} disabled={pageNum > 3}>
					Next
				</button>
			</div>
		</div>
	);
};

export default PaginatedQueries;
