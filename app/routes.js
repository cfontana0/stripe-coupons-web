import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Coupons from './containers/Coupons';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Coupons} />
	</Route>
);
