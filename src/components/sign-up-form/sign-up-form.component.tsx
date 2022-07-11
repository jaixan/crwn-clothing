import { useState, FC, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { SignUpContainer } from "./sign-up-form.styles";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, confirmPassword, displayName } = formFields;
    const dispatch = useDispatch();

    console.log(formFields);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, displayName, confirmPassword } = formFields;
    
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert("Email already in use");
            }
            console.error(error);

        }
        
      }

    return (
      <SignUpContainer>
        <h2>Don't have an account?</h2>
        <span>Sign Up with your Email and Password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            required
            type= "text"
            name= "displayName" 
            onChange= {handleChange}
            value = {displayName}
          />
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
                value={password}
          />
          <FormInput
            label="Confirm Password"
                required
                type= "password"
                name= "confirmPassword"
                onChange= {handleChange} 
                value= {confirmPassword}
          />
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign Up</Button>
        </form>
      </SignUpContainer>
    );
    }

export default SignUpForm;