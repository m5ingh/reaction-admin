import React, { Fragment, useEffect, useState } from "react";
import config from "../../config.js"
import axios from "axios";

/**
 * @summary Mailchimp marketing
 * @name Mailchimp
 * @returns {React.Component} A React component
 */
 function MailchimpLogin() {
  const [loginHTML, setloginHTML] = useState("<h1>Unable to connect</h1>");
    startAuth();

    
    return (
      <Fragment>
        <h1>Connect to MC</h1>
        <div dangerouslySetInnerHTML={{ __html: loginHTML }}></div>

      </Fragment>
    );

    function startAuth() {
      const redirectURI = `${config.BASE_URL}/oauth/mailchimp/callback`;
      const url = `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${config.MAILCHIMP_CLIENT_ID}&redirect_url=${redirectURI}`;
      axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin' : '*',
        }})
        .then((res) => {
          console.log("This is the success promise response");
          setloginHTML(res);
        })
        .catch((error) => console.log("Error with initiating auth\n", error));
    }
  }
  
  export default MailchimpLogin;