import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer, Divider } from "./authentication.styles";

const Authentication = () => {

  return (
    <div>
      <h1>Sign In Page</h1>
      <AuthenticationContainer>
        <SignInForm />
        <Divider></Divider>
        <SignUpForm />
      </AuthenticationContainer>
    </div>
  );
};
export default Authentication;
