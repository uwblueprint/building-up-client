import * as React from 'react';
import { Flex, IconButton, Input } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const QuantityButton = ({ aria, icon, quantityProps }) => {
  return (
    <IconButton size="icon" variant="inverted" borderRadius="none" aria-label={aria} icon={icon} {...quantityProps} />
  );
};

const QuantityPicker = ({ getInputProps, getIncrementButtonProps, getDecrementButtonProps }) => {
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex>
      <QuantityButton aria="Decrement Quantity" icon={<MinusIcon />} quantityProps={dec} />
      <Input variant="quantity" size="quantity" {...input} />
      <QuantityButton aria="Decrement Quantity" icon={<AddIcon />} quantityProps={inc} />
    </Flex>
  );
};

export default QuantityPicker;
