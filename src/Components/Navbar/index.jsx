import React from 'react';
import styles from './styles.less';

import {withRouter} from 'react-router-dom';
import { NavLink } from "react-router-dom";

import { Grid , Container, Menu } from "semantic-ui-react";

import SignOutLink from "../SignOut"

import * as ROUTES from "../../Constants/routes.js";

const accountMenuSignedIn = 
	<Menu.Menu position="right" >
		<Menu.Item as={NavLink} to={ROUTES.ACCOUNT} name="Account" className="nav-link" activeClassName="active" />
		<Menu.Item as={SignOutLink} name="Sign Out" className="nav-link" />  
	</Menu.Menu>;

const accountMenuSignedOut = 
	<Menu.Menu position="right" >
		<Menu.Item as={NavLink} to={ROUTES.SIGN_IN} name="Sign In" className="nav-link" activeClassName="active" />
	</Menu.Menu>;


class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticated: this.props.authenticated,
			route: this.props.location.pathname
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			authenticated: nextProps.authenticated,
			route: nextProps.location.pathname
		};
	}

	setBackground = (state) => {
		let className = '';
		if(state.route === ROUTES.HOME) {
			className = 'navbar-transparent inverted';
		} else {
			className = 'navbar-primary';
		}
		return className;
	}

	setAccountMenu = (state) => {
		let accountMenu;
		if(this.state.authenticated) { accountMenu = accountMenuSignedIn; }
		else { accountMenu = accountMenuSignedOut; }

		return accountMenu;
	}

	render() {

		let accountMenu = this.setAccountMenu(this.state);
		let backgroundClass = this.setBackground(this.state);

		// additonal logic for active class needed
		// https://stackoverflow.com/questions/47879663/root-navlink-always-get-active-class-react-router-dom

		return (
			<Menu borderless={true} size='huge' className={"navbar-root " + backgroundClass}>
				<Container>
					<Menu.Item as={NavLink} to={ROUTES.HOME} name="Home" className="nav-link" activeClassName="active" />
					<Menu.Item as={NavLink} to={ROUTES.TICKETS} name="Tickets" className="nav-link" activeClassName="active" />
					<Menu.Item as={NavLink} to={ROUTES.EVENTS} name="Events" className="nav-link" activeClassName="active" />
					{accountMenu}
				</Container>
			</Menu>
		);
	}
}


export default withRouter(Navbar);