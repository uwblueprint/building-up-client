import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useShopify } from 'hooks/useShopify';
import { Heading, Flex, Spacer, Image, Text, Button } from '@chakra-ui/react';
import { AccordionProductDetails } from '../../components/storefront';

const Product = () => {
  const { id } = useParams();
  const { products } = useShopify();

  const { images, title, description, variants } = products.find(product => product.id === id);

  const productSku = variants && variants[0].sku;
  const productImage = images && images[0].src;
  const productPrice = variants && variants[0].price;

  const accordionDetails = [
    { title: 'Shipping Fees, Exchanges & Returns', panel: 'To be implemented' },
    { title: 'Tax Return Information', panel: 'To be implemented' },
    { title: 'Add Donation', panel: 'To be implemented' },
    { title: 'Share', panel: 'To be implemented' },
  ];

  return (
    <Flex py={20} px={32}>
      <Flex w="100%" border="1px solid black">
        <Image w="100%" h="100%" src={productImage} alt={title} />
      </Flex>
      <Spacer />
      <Flex direction="column" w="100%" pl={10}>
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
          {`Item #${productSku}`}
        </Heading>
        <Heading as="h3" size="h3" textTransform="uppercase" my={5}>
          {title}
        </Heading>
        <Heading as="h3" size="h3" color="brand.red">
          {`$${productPrice}`}
        </Heading>
        <Text my={3}>{description}</Text>
        <Button textTransform="uppercase" mb={10} onClick={() => alert('Not implemented')}>
          {'Add to shopping bag'}
        </Button>
        <AccordionProductDetails details={accordionDetails} />
      </Flex>
    </Flex>
  );
};

export default Product;
