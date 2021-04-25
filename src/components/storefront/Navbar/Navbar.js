import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  useBreakpointValue,
  chakra,
} from '@chakra-ui/react';
import BagIconWithIndicator from 'components/storefront/BagIcon/BagIcon';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';
import { PageContainer } from 'components/storefront/PageContainer/PageContainer';
import Logo from 'assets/images/logoWhite.png';
import { TeamBanner } from '../';

export const NAVBAR_HEIGHT_RESPONSIVE = { base: '90px', sm: '100px', lg: '126px' };

export const useNavbarHeight = () => {
  return useBreakpointValue(NAVBAR_HEIGHT_RESPONSIVE);
};

const NavLink = chakra(Link, {
  baseStyle: {
    _hover: { color: 'brand.red', textDecoration: 'none' },
    transition: 'all 0.15s ease-out',
    textTransform: 'uppercase',
    textStyle: 'subtitle',
  },
});

const SubHeading = () => {
  const { pathname } = useLocation();

  return (
    pathname === '/store/cart' && (
      <Box bg="black">
        <PageContainer maxW="container.xl" bg="black" py={{ base: 0, lg: 4 }}>
          <Heading color="white" fontSize={['xl', '2xl', '3xl', '4xl', '5xl']}>
            MY SHOPPING BAG
          </Heading>
        </PageContainer>
      </Box>
    )
  );
};

const Navbar = props => {
  const layout = useBreakpointValue({ base: 'left', md: 'right' });

  return (
    <>
      <Grid
        bg="black"
        w="100%"
        h={NAVBAR_HEIGHT_RESPONSIVE}
        templateColumns="repeat(3, 1fr)"
        alignItems="center"
        color="white"
        position="sticky"
        top="0"
        zIndex="1"
      >
        {layout === 'left' && (
          <GridItem ml={8}>
            <NavLink href="https://raisingtheroof.org/donate">Donate</NavLink>
          </GridItem>
        )}
        <GridItem as={PreserveQueryParamsLink} to="/store" colStart={2} justifySelf="center">
          <Image src={Logo} alt="Raising The Roof/Chez Toit Logo" maxH="85px" />
        </GridItem>
        <GridItem
          as={HStack}
          spacing={[2, 4, 4, 8, '56px']}
          h="100%"
          mr={[8, 12, 12, 16, 24]}
          colStart={3}
          justifySelf="end"
        >
          {layout === 'right' && (
            <>
              <NavLink href="https://raisingtheroof.org/donate">Donate</NavLink>
              <NavLink as={PreserveQueryParamsLink} to="/store">
                Shop
              </NavLink>
              <Divider orientation="vertical" h="60%" opacity={1} />
            </>
          )}
          <NavLink as={PreserveQueryParamsLink} to="/store/cart">
            <BagIconWithIndicator />
          </NavLink>
        </GridItem>
      </Grid>
      <SubHeading />
      <Box position="sticky" top={NAVBAR_HEIGHT_RESPONSIVE} zIndex="1">
        <TeamBanner {...props} />
      </Box>
    </>
  );
};

export default Navbar;
