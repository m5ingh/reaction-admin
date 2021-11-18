import React, { Fragment, useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import config from "../../config.js"
import axios from "axios";

/**
 * @summary Mailchimp marketing
 * @name Mailchimp
 * @returns {React.Component} A React component
 */
 function MailchimpLogin() {
  const [loginHTML, setloginHTML] = useState("<h1>Unable to connect</h1>");
    // startAuth();
    startGQLAuth();

    
    return (
      <Fragment>
        <h1>Connect to MC</h1>
        <div id="mc-login" dangerouslySetInnerHTML={{ __html: loginHTML }}></div>

      </Fragment>
    );

    function startGQLAuth(){
      const redirectURI = `${config.BASE_URL}/oauth/mailchimp/callback`;
      const uri = "https://login.mailchimp.com/";
      const clientId = config.MAILCHIMP_CLIENT_ID
      
      const restLink = new RestLink({ uri: uri });

      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: restLink
      });

      const query = gql`
        query RESTQuery ($response_type: String, $client_id: String, $redirect_url: String) {
          test(response_type:"code", client_id:clientId, redirect_url:redirectURI) @rest(type: "TestResponse", path: "oauth2/authorize?response_type={code}&client_id={client_id}&redirect_url={redirect_url}") {
            data
          }
        }
      `;

      // const { data } = useQuery(query, {
      //   fetchPolicy: 'cache-and-network',
      // })

      // console.log("rest-link response 1", data);

      client.query({ query }).then(response => {
        console.log("rest-link response 2", response);
      });
    }

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