import React from 'react';
import {Input, FormControl} from 'native-base';
import {Controller} from 'react-hook-form';

interface model {
  label?: string;
  name?: string;
  placeholder?: string;
  variant?: 'filled' | 'unstyled';
  onChangeText?: any;
  errors?: any;
  type?: 'text' | 'password';
  style?: object;
  InputRightElement?: any;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  control?: any;
  keyboardType?:
    | 'number-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'decimal-pad'
    | 'default';
}

const InputComponent: React.FC<model> = ({
  label,
  placeholder,
  variant = 'filled',
  onChangeText,
  errors,
  name = '',
  type = 'text',
  style,
  InputRightElement,
  isReadOnly = false,
  isDisabled = false,
  defaultValue = '',
  keyboardType = 'default',
  control = null,
}) => {
  return (
    <FormControl isInvalid={errors[name] ? true : false} style={style}>
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <Input
            placeholder={placeholder}
            variant={variant}
            type={type}
            size="md"
            py={1.5}
            maxH="12"
            keyboardType={keyboardType}
            onChangeText={text => onChange(text)}
            InputRightElement={InputRightElement}
            isReadOnly={isReadOnly}
            value={value}
            isDisabled={isDisabled}
            defaultValue={defaultValue}
          />
        )}
      />
      {errors[name] && (
        <FormControl.ErrorMessage>
          {errors[name].message}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default React.memo(InputComponent);
