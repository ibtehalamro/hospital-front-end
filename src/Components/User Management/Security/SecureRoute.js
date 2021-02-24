import {Redirect, Route} from "react-router";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => (

     <Route
        {...otherProps}
        render={props =>
            security.validToken === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);


export default SecuredRoute;