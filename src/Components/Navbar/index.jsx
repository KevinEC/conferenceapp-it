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
			authenticated: this.props.authenticated
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			authenticated: nextProps.authenticated
		};
	}

	render() {

		let accountMenu = '';
		if(this.state.authenticated) { accountMenu = accountMenuSignedIn; }
		else { accountMenu = accountMenuSignedOut; }
			

		return (
			<Menu borderless inverted size='huge' className="navbar-root">
				<Container>
					<Menu.Item as={NavLink} to={ROUTES.HOME} name="Home" className="nav-link" activeClassName="active" />
					<Menu.Item as={NavLink} to={ROUTES.TICKETS} name="Tickets" className="nav-link" activeClassName="active" />
					{accountMenu}
				</Container>
			</Menu>
		);
	}
}


export default withRouter(Navbar);