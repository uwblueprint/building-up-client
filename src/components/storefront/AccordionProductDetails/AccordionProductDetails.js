import * as React from 'react';
import { Accordion, AccordionItem, AccordionPanel, AccordionButton, Heading, Spacer } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const Item = ({ title, panel }) => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton py={5} px={0}>
            <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
              {title}
            </Heading>
            <Spacer />
            {isExpanded ? <MinusIcon color="brand.gray" /> : <AddIcon color="brand.gray" />}
          </AccordionButton>
          <AccordionPanel px={0}>{panel}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

const AccordionProductDetails = ({ details }) => {
  return (
    <Accordion allowToggle allowMultiple>
      {details &&
        details.length > 0 &&
        details.map(({ title, panel }, i) => <Item key={i} title={title} panel={panel} />)}
    </Accordion>
  );
};

export default AccordionProductDetails;
