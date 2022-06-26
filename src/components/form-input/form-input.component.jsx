import {FormInputLabel, Group, Input} from './form-input.styles';

const FormInput = (props) => {
    const { label, inputOptions } = props;
    return (
      <Group>
        <Input {...inputOptions} />
        {label && (
          <FormInputLabel 
            shrink={
                inputOptions.value.length ? 1 : 0
            }
          >
            {label}
          </FormInputLabel>
        )}
      </Group>
    );
    }

    export default FormInput;