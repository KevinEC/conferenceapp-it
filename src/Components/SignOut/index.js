import React from 'react';
import { withFirebase } from "../../Middleware/Firebase";

import { Menu } from "semantic-ui-react";

const SignOutLink = ({firebase}) => (
	<Menu.Item as="a" onClick={firebase.auth.doSignOut}>
		Sign Out
	</Menu.Item>
);

export default withFirebase(SignOutLink);