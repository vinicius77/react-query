import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<div>
			<nav>
				<ul className="nav-items" style={{ display: 'flex', listStyle: 'none' }}>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/rq-products">React-Query Products</Link>
					</li>
					<li>
						<Link to="/parallel">Parallel Queries</Link>
					</li>
					<li>
						<Link to="/dynamic">Dynamic Queries</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
