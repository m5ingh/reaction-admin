import React, { Fragment } from "react";
import config from "../../config.js"

/**
 * @summary Mailchimp marketing
 * @name Mailchimp
 * @returns {React.Component} A React component
 */
 function MailchimpLogin() {
    registerCallback()
    return (
      <Fragment>
        <h1>Connect to MC</h1>
        <button className="btn btn-primary" onClick={startAuth}>
        <i className="fa fa-cogs"></i> <span data-i18n="">Connect</span>
      </button>

      </Fragment>
    );

    async function startAuth() {
      
      console.log("Start auth clicked")
      const redirectURI = `${config.BASE_URL}/mailchimp/callback`;
      const url = `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${config.MAILCHIMP_CLIENT_ID}&redirect_url=${redirectURI}`;
      
      // Opens the URL in the default browser.
      window.open(url, '_blank');
    }

    function registerCallback() {
      if(WebApp.rawConnectHandlers){
        WebApp.connectHandlers.use("/mailchimp/callback/", (req, res) => {
          const {
            query: { code }
          } = req;
        });
      }
      else{
        console.log("Error with WebApp.ConnectHandlers")
      }
    }

  }
  
  export default MailchimpLogin;