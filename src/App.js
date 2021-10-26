import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import RQProducts from './components/pages/RQProducts';
import { RQProduct } from './components/pages/RQProduct';
import { QueryClientProvider as Provider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ParallelQueries from './components/pages/ParallelQueries';
import DynamicQueries from './components/pages/DynamicQueries';
import './App.css';
import DependentQueries from './components/pages/DependentQueries';
import PaginatedQueries from './components/pages/PaginatedQueries';

const rqClient = new QueryClient();

function App() {
	return (
		<Provider client={rqClient}>
			<Router>
				<Fragment>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/products" exact component={Products} />
						<Route path="/products/:id" component={RQProduct} />
						<Route path="/rq-products" component={RQProducts} />
						<Route path="/parallel" component={ParallelQueries} />
						<Route path="/dynamic">
							<DynamicQueries charIds={[10, 12]} />
						</Route>
						<Route path="/dependent">
							<DependentQueries email="vbonifacio@faang.com" />
						</Route>
						<Route path="/paginated-queries" component={PaginatedQueries} />
					</Switch>
				</Fragment>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</Provider>
	);
}

export default App;
