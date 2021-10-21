import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUser = async (email) => {
	return await axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCourse = (id) => {
	return axios.get(`http://localhost:4000/courses/${id}`);
};

const DependentQueries = ({ email }) => {
	const { data: user, error, isLoading } = useQuery(['users', email], () => fetchUser(email));

	const courseId = user?.data.courseId;

	const { data: course, error: courseError } = useQuery(
		['courses', courseId],
		() => fetchCourse(courseId),
		{
			enabled: !!courseId,
		}
	);

	return (
		<div>
			<h2>Dependent Queries</h2>
			<h3>User Section</h3>
			<p>
				Fetches the course based in the user: <strong>{user?.data.name}</strong>
			</p>
			{error && <p>{error.message}</p>}
			{isLoading && <p>Loading User ...</p>}
			<h3>Course Section</h3>
			<p>Dependent Query</p>
			{courseError && <p>{courseError.message}</p>}
			{course?.data && (
				<div>
					<h3>Courses</h3>
					<ul>
						{course.data.subject.map((name, index) => (
							<li key={name}>
								{index} - {name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DependentQueries;
