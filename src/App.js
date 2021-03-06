import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
//import awsconfig from './aws-exports';

Amplify.configure({
  "aws_project_region": "ap-northeast-1",
  "aws_appsync_graphqlEndpoint": "https://mfdb7u5orzdrzpg6plhdnxl2zq.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  "aws_appsync_region": "ap-northeast-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-3vwigqlhpvcqxcnuia6q5gc6jm",
  "aws_cognito_identity_pool_id": "ap-northeast-1:f7aa7223-6605-4cb8-afaf-f5f5b5b882a4",
  "aws_cognito_region": "ap-northeast-1",
  "aws_user_pools_id": "ap-northeast-1_pwMdc01vK",
  "aws_user_pools_web_client_id": "56ono9malichau8g1tr7b3ojfr",
  "oauth": {}
    
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