import React from 'react';
import {
  FormControl,
  Input,
  Icon,
  IconButton,
  KeyboardAvoidingView,
} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface model {
  value?: string;
  placeholder: string;
  onChangeText: any;
}

const SearchBox: React.FC<model> = ({onChangeText, value, placeholder}) => {
  return (
    <FormControl>
      <Input
        placeholder={placeholder}
        variant="filled"
        // value={value}
        maxH="12"
        autoFocus={false}
        onChangeText={onChangeText}
        InputLeftElement={
          <IconButton
            variant="unstyle"
            icon={<Icon as={EvilIcons} name="search" size={8} />}
          />
        }
      />
    </FormControl>
  );
};

export default React.memo(SearchBox);
