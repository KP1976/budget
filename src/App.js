import React, { Fragment, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import GlobalStyles from './index.css';
import { fetchBudget, fetchBudgetedCategories } from './data/actions/budget.actions';

import theme from 'utils/theme';
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';

function App({ budget, fetchBudget, fetchBudgetedCategories }) {
	const { i18n } = useTranslation();

	useEffect(() => {
		fetchBudget(1);
		fetchBudgetedCategories(1);
	}, [fetchBudget, fetchBudgetedCategories]);

	console.log(budget);

	return (
		<Fragment>
			<GlobalStyles />
			<Router>
				<Navigation
					items={[
						{ content: 'Home', to: '/' },
						{ content: 'Budget', to: '/budget' },
					]}
					RightElement={
						<div>
							<Button variant='regular' onClick={() => i18n.changeLanguage('pl')}>
								pl
							</Button>
							<Button variant='regular' onClick={() => i18n.changeLanguage('en')}>
								en
							</Button>
						</div>
					}
				/>
				<Wrapper>
					<Switch>
						<Route exact path='/'>
							Home
						</Route>
						<Route path='/budget'>Budget Page</Route>
					</Switch>
				</Wrapper>
			</Router>
		</Fragment>
	);
}

const ConnectedApp = connect(
	(state) => {
		return {
			budget: state.budget.budget,
		};
	},
	{
		fetchBudget,
		fetchBudgetedCategories,
	},
)(App);

function RootApp() {
	return (
		<ThemeProvider theme={theme}>
			<React.Suspense fallback={<LoadingIndicator />}>
				<ConnectedApp />
			</React.Suspense>
		</ThemeProvider>
	);
}

export default RootApp;
