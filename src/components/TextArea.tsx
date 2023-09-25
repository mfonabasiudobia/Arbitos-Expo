import {FormControl, TextArea} from 'native-base';
import React from 'react';
import {Controller} from 'react-hook-form';

interface model {
  label?: string;
  name?: string;
  placeholder?: string;
  onChangeText?: any;
  errors?: any;
  style?: object;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  numberOfLines?: number;
  control?: any;
}

const TextAreaComponent: React.FC<model> = ({
  label,
  placeholder,
  onChangeText,
  errors,
  name = '',
  style,
  isReadOnly = false,
  isDisabled = false,
  defaultValue = '',
  control = null,
  numberOfLines = 3,
}) => {
  return (
    <FormControl isInvalid={errors[name] ? true : false} style={style}>
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <TextArea
            placeholder={placeholder}
            numberOfLines={numberOfLines}
            onChangeText={text => onChange(text)}
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

export default React.memo(TextAreaComponent);
