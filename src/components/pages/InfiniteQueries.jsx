import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

const fetchLangs = async ({ pageParam = 1 }) => {
	return await axios.get(`http://localhost:4000/languages/?_limit=2&_page=${pageParam}`);
};

const InfiniteQueries = () => {
	const { data, isLoading, error, isFetchingNextPage, isFetching, hasNextPage, fetchNextPage } =
		useInfiniteQuery(['languages'], fetchLangs, {
			getNextPageParam: (_lastPage, pages) => (pages.length < 3 ? pages.length + 1 : null),
		});

	return (
		<div>
			<h2>Infinite Query</h2>
			<div>
				<h3>Languages</h3>
				{error && <p>{error.message}</p>}
				{isLoading && <p>Loading ...</p>}
				{data?.pages.map((group, index) => {
					return (
						<ul key={index}>
							{group.data.map((lang) => (
								<li key={lang.id}>{lang.name}</li>
							))}
						</ul>
					);
				})}
			</div>
			{isFetching && !isFetchingNextPage && <p>Fetching...</p>}
			<button onClick={fetchNextPage} disabled={!hasNextPage}>
				Load More
			</button>
		</div>
	);
};

export default InfiniteQueries;
