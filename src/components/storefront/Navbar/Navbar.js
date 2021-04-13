import * as React from 'react';
import { Divider, Grid, GridItem, HStack, Image, Link, chakra, Box } from '@chakra-ui/react';

import BagIcon from 'components/storefront/BagIcon/BagIcon';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';
import Logo from 'assets/images/logoWhite.png';
import { TeamBanner } from '../';

const NavLink = chakra(Link, {
  baseStyle: {
    _hover: { color: 'brand.red', textDecoration: 'none' },
    transition: 'all 0.15s ease-out',
    textTransform: 'uppercase',
    textStyle: 'subtitle',
  },
});

const Navbar = props => (
  <Box position="sticky" top="0" zIndex="1">
    <Grid bg="black" w="100%" h="126px" templateColumns="repeat(3, 1fr)" alignItems="center" color="white">
      <GridItem as={PreserveQueryParamsLink} to="/store" colStart={2} justifySelf="center">
        <Image src={Logo} alt="Raising The Roof/Chez Toit Logo" maxH="85px" />
      </GridItem>

      <GridItem
        as={HStack}
        spacing={[2, 4, 6, 8, '56px']}
        h="100%"
        mr={[4, 8, 12, 16, 24]}
        colStart={3}
        justifySelf="end"
      >
        <NavLink href="https://raisingtheroof.org/donate">Donate</NavLink>
        <NavLink as={PreserveQueryParamsLink} to="/store">
          Shop
        </NavLink>
        <Divider orientation="vertical" h="60%" opacity={1} />
        <NavLink as={PreserveQueryParamsLink} to="/store/cart">
          <BagIcon height="28px" width="28px" />
        </NavLink>
      </GridItem>
    </Grid>
    <TeamBanner {...props} />
  </Box>
);

export default Navbar;
