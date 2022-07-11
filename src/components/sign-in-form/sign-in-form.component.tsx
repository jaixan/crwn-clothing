import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import {SignInContainer} from './sign-in-form.styles';
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formFields;
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
          alert('SignInFailed');
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
            required
            type= "text"
            name= "email"
            onChange= {handleChange}
            value= {email}
          />
          <FormInput
            label="Password"
            required
            type= "password"
            name= "password"
            onChange= {handleChange}
            value= {password}
            
          />
          <div className="buttons">
            <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign In</Button>
            <Button type="button" onClick={logGoogleUser} buttonType={BUTTON_TYPE_CLASSES.google}>
              Sign In With Google
            </Button>
          </div>
        </form>
      </SignInContainer>
    );
    }

export default SignInForm;