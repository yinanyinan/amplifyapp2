import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
//import awsconfig from './aws-exports';

Amplify.configure({
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_identity_pool_id": "ap-northeast-1:7268b741-cced-436f-ba3e-7b39dfa49999",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "ap-northeast-1_uyU3piIjK",
    "aws_user_pools_web_client_id": "2889o4ett0c5t9e7sjqv4brs8m",
    "oauth": {},
    "aws_appsync_graphqlEndpoint": "https://ofjgtpqayjbdfgc2dfbt2gjao4.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-azoecr6horh5xcygblieemz47q"
});

const App = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.username}</div>
          <AmplifySignOut />
      </div>
    ) : (
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" }
          ]}
        />
      </AmplifyAuthenticator>
  );
}

export default App;