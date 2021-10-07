import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import RQProducts from './components/pages/RQProducts';
import { QueryClientProvider as Provider, QueryClient } from 'react-query';

const rqClient = new QueryClient();

function App() {
	return (
		<Provider client={rqClient}>
			<Router>
				<Fragment>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/products" component={Products} />
						<Route path="/rq-products" component={RQProducts} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
