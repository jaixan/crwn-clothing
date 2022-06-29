import { useState } from "react";
import { SignUpContainer } from "./sign-up-form.styles";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, confirmPassword, displayName } = formFields;

    console.log(formFields);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, displayName, confirmPassword } = formFields;
    
        if (password.value !== confirmPassword.value) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
              email,
              password
            );

            await createUserDocumentFromAuth(user, { displayName });
            
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
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
            inputOptions = {{
            required: true,  
            type: "text", 
            name: "displayName", 
            onChange: handleChange, 
            value: displayName
            }}
          />
          <FormInput
            label="Email"
            inputOptions = {{
                required: true,  
                type: "text", 
                name: "email", 
                onChange: handleChange, 
                value: email
                }}
          />
          <FormInput
            label="Password"
            inputOptions = {{
                required: true,  
                type: "password", 
                name: "password", 
                onChange: handleChange, 
                value: password
                }}
          />
          <FormInput
            label="Confirm Password"
            inputOptions = {{
                required: true,  
                type: "password", 
                name: "confirmPassword", 
                onChange: handleChange, 
                value: confirmPassword
                }}
          />
          <Button buttonType='base' type="submit">Sign Up</Button>
        </form>
      </SignUpContainer>
    );
    }

export default SignUpForm;