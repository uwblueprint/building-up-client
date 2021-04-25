import * as React from 'react';
import { Flex, IconButton, Input } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const QuantityButton = ({ aria, icon, quantityProps, height, width }) => {
  return (
    <IconButton
      height={height}
      maxWidth={width}
      size="icon"
      variant="inverted"
      borderRadius="none"
      aria-label={aria}
      icon={icon}
      {...quantityProps}
    />
  );
};

const QuantityPicker = ({ getInputProps, getIncrementButtonProps, getDecrementButtonProps, size }) => {
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const dimension = size === 'checkout' ? '40px' : '52px';

  return (
    <Flex>
      <QuantityButton
        aria="Decrement Quantity"
        icon={<MinusIcon />}
        height={dimension}
        width={dimension}
        quantityProps={dec}
      />
      <Input variant="quantity" size={size} {...input} />
      <QuantityButton
        aria="Decrement Quantity"
        icon={<AddIcon />}
        height={dimension}
        width={dimension}
        quantityProps={inc}
      />
    </Flex>
  );
};

export default QuantityPicker;
