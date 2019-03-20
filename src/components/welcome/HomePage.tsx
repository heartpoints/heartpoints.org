import * as React from "react";

export const HomePage = () => {
    return <div className="vertical-center">
    <div className="container">
        <div className="row">
            <div className="col-md-2"> </div>
            <div className="col-md-8">
                <img className="center-block" width="100%" src="images/logo.png" />
                <p style={{textAlign: "center", marginBottom: "0px", marginTop: "25px"}}>help us build something amazing!</p>
                <h2 style={{textAlign: "center", marginTop: "10px"}}>
                    <a href="mailto:info@heartpoints.org">info@heartpoints.org</a> 
                </h2>
                <p style={{textAlign: "center", marginBottom: "0px", marginTop: "25px"}}>
                    <a href=""></a>
                </p>
            </div>
        </div>
    </div>
</div>
}