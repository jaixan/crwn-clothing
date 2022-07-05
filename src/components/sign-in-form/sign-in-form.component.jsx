import { useState } from "react";
import { useDispatch } from "react-redux";

import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import {SignInContainer} from './sign-in-form.styles';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formFields;
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("User not found");
                    break;
                case "auth/wrong-password":
                    alert("Wrong password");
                    break;
                default:
                    alert("Something went wrong");
                    console.log(error);
                    break;
            }
        }
      }

    const logGoogleUser = () => {
        dispatch(googleSignInStart());
      };

    return (
      <SignInContainer>
        <h2>Sign In</h2>
        <span>Sign In with your Email and Password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            inputOptions={{
              required: true,
              type: "text",
              name: "email",
              onChange: handleChange,
              value: email,
            }}
          />
          <FormInput
            label="Password"
            inputOptions={{
              required: true,
              type: "password",
              name: "password",
              onChange: handleChange,
              value: password,
            }}
          />
          <div className="buttons">
            <Button buttonType='base' type="submit">Sign In</Button>
            <Button type="button" onClick={logGoogleUser} buttonType="google-sign-in">
              Sign In With Google
            </Button>
          </div>
        </form>
      </SignInContainer>
    );
    }

export default SignInForm;