import * as React from "react";
import ReactFacebookLogin from "react-facebook-login";
import Cookies from "js-cookie";

export const HomePage = ({navigateToSimpleModel, facebookUserSession}) => <div className="jumbotron vertical-center">
    <div className="container">
        <div className="row">
            <div className="col-md-2"> </div>
            <div className="col-md-8">
                <img className="center-block" width="100%" src="images/heartpoints-splash.png" />
                <p style={{textAlign: "center", marginBottom: "0px", marginTop: "25px"}}>help us build something amazing!</p>
                <h2 style={{textAlign: "center", marginTop: "10px"}}>
                    <a href="mailto:info@heartpoints.org">info@heartpoints.org</a> 
                </h2>
                <p style={{textAlign: "center", marginBottom: "0px", marginTop: "25px"}}>
                    <a href=""></a>
                </p>
            </div>
            <div className="col-md-2"> 
                {facebookUserSession && <a onClick={navigateToSimpleModel}>simple model</a>}
            </div>
        </div>
    </div>
</div>

export const FacebookStuff = ({facebookUserSession, onFacebookLoginComplete}) => 
    facebookUserSession 
        ? <pre>{JSON.stringify(facebookUserSession, null, 3)}</pre> 
        : <ReactFacebookLogin
            appId="1010813445640879"
            autoLoad={true}
            fields="name,email,picture"
            callback={onFacebookLoginComplete} 
            />