// import React from 'react';
// import FBSDK, { LoginManager } from 'react-native-fbsdk';
      
// export default class FacebookLogin extends React.PureComponent {

//   facebookAuth(){
//     LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
//       if(result.isCancelled){
//         console.log("Login was cancelled")
//       } else {
//         console.log("Login was a success" + result.grantedPermissions.toString());
//       }
//     }, function(error){
//       console.log("error" + error);
//     })
//   }
//   render() {
//     return (
//       <View>
//         <LoginButton
//           publishPermissions={["publish_actions"]}
//           onLoginFinished={
//             (error, result) => {
//               if (error) {
//                 alert("Login failed with error: " + result.error);
//               } else if (result.isCancelled) {
//                 alert("Login was cancelled");
//               } else {
//                 alert("Login was successful with permissions: " + result.grantedPermissions)
//               }
//             }
//           }
//           onLogoutFinished={() => alert("User logged out")}/>
//       </View>
//     );
//   }
// });