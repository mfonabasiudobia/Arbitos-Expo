import {AppBar} from '@components';
import {Button, Heading, Text, VStack, useTheme} from 'native-base';
import React, {useState} from 'react';
import DeleteIcon from '/assets/svg/delete-account.svg';
import {MessageModal} from '@components';
import useUser from '@hooks/useUser';

const DeleteAccount = () => {
  const [showDeleteModal, setDeleteModal] = useState(false);

  const {handleDeleteAccount} = useUser();

  return (
    <>
      <AppBar title="Delete Account" />
      <MessageModal
        isOpen={showDeleteModal}
        onClose={() => setDeleteModal(prev => !prev)}
        successButtonAction={handleDeleteAccount}
        type="error"
        errorTitle="Are you sure you want to delete this account?"
        errorButtonTitle="Yes, Delete"
        errorDescription="This action will delete your account permanently and cannot be undone"
      />
      <VStack
        p={5}
        space={10}
        flex={1}
        alignItems="center"
        justifyContent="flex-end">
        <VStack alignItems="center" justifyContent="center">
          <DeleteIcon />
        </VStack>

        <VStack space={2}>
          <Heading textAlign="center">Remove My Account</Heading>
          <Text textAlign="center">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Text>
        </VStack>

        <Button
          colorScheme="primary"
          w="full"
          onPress={() => setDeleteModal(prev => !prev)}>
          Deactivate Account
        </Button>
      </VStack>
    </>
  );
};

export default DeleteAccount;
