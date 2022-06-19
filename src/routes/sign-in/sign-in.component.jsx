import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  signinWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signinWithGooglePopup();
    createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google PopUp</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
