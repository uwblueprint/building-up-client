import * as React from 'react';
import { Accordion, AccordionItem, AccordionPanel, AccordionButton, Heading, Spacer, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const content = [
  {
    title: 'Shipping Fees, Delivery & Returns',
    panel:
      'Shipping is calculated at checkout. \n\nDelivery: 2-3 weeks from ordering (location dependent). \n\nReturn Policy: All sales final',
  },
  {
    title: 'Tax Return Information',
    panel:
      'Your toque purchase is NOT eligible for a tax receipt, under Revenue Canada rules, because you receive a product for your contribution. However, a donation of $20 or more in addition to your item purchase is fully tax receiptable.',
  },
];

const Item = ({ title, panel }) => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <h4>
            <AccordionButton
              py={5}
              px={0}
              background="white"
              color={isExpanded ? 'brand.black' : 'brand.gray'}
              _hover={{
                color: 'black',
              }}
            >
              <Heading as="h4" size="subtitle" textTransform="uppercase" textAlign="left">
                {title}
              </Heading>
              <Spacer />
              {isExpanded ? <MinusIcon /> : <AddIcon />}
            </AccordionButton>
          </h4>
          <AccordionPanel px={0}>
            <Text whiteSpace="pre-wrap">{panel}</Text>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

const AdditionalContent = () => {
  return (
    <Accordion allowToggle allowMultiple>
      {content && content.map(({ title, panel }, i) => <Item key={i} title={title} panel={panel} />)}
    </Accordion>
  );
};

export default AdditionalContent;
