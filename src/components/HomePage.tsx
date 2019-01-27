import * as React from "react";

export const HomePage = ({navigateToSimpleModel, isDev}) => <div className="jumbotron vertical-center">
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
                {isDev && <a onClick={navigateToSimpleModel}>simple model</a>}
            </div>
        </div>
    </div>
</div>