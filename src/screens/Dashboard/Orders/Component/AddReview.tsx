import {TextArea} from '@components';
import useOrder from '@hooks/useOrder';
import {useForm, yup, yupResolver} from '@lib/index';
import {Button, Modal, VStack, useColorMode, useTheme} from 'native-base';
import React from 'react';
import {Rating} from 'react-native-ratings';

interface model {
  isOpen: boolean;
  onClose: () => any;
  productId: string;
  orderId: string;
}

let schema = yup.object({
  comment: yup.string().required().label('Comment'),
  rate: yup.string().required().label('rate'),
});

const AddReview: React.FC<model> = ({
  isOpen = false,
  onClose,
  productId,
  orderId,
}) => {
  const {config, addReview} = useOrder();
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const {
    handleSubmit,
    setValue,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      rate: 5,
    },
  });

  const handleReviewSubmit = data => {
    addReview({
      comment: data.comment,
      rate: data.rate,
      product_id: productId,
      order_id: orderId,
    });

    if (!config.isBtnLoading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayVisible={true}
      size="full"
      avoidKeyboard
      justifyContent="flex-end"
      bottom="0"
      animationPreset="slide">
      <Modal.Content>
        <Modal.Body bg={colorMode === 'dark' ? '#333' : 'white'}>
          <VStack space={5}>
            <VStack alignItems="flex-start" space={2} w="full">
              <Rating
                readonly={false}
                tintColor={colorMode === 'dark' ? '#333' : 'white'}
                type="custom"
                ratingBackgroundColor={colorMode === 'dark' ? 'white' : '#cccc'}
                ratingCount={5}
                startingValue={5}
                onFinishRating={value => setValue('rate', value)}
                imageSize={30}
              />
            </VStack>

            <TextArea
              placeholder="Comment"
              label="Drop your review"
              name="comment"
              errors={errors}
              control={control}
            />

            <Button
              colorScheme="primary"
              size="lg"
              isLoading={config.isBtnLoading}
              onPress={handleSubmit(handleReviewSubmit)}>
              Submit
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default React.memo(AddReview);
