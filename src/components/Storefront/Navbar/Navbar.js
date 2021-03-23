import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Divider, Grid, GridItem, HStack, Image, Link, chakra } from '@chakra-ui/react';

import BagIcon from 'components/storefront/BagIcon/BagIcon';
import Logo from 'assets/images/logoWhite.png';

const NavLink = chakra(Link, {
  baseStyle: {
    _hover: { color: 'brand.red', textDecoration: 'none' },
    transition: 'all 0.15s ease-out',
    textTransform: 'uppercase',
    textStyle: 'subtitle',
  },
});

const Navbar = () => (
  <Grid bg="black" w="100%" h="126px" templateColumns="repeat(3, 1fr)" alignItems="center" color="white">
    <GridItem as={Image} src={Logo} maxH="85px" alt="Raising The Roof Logo" colStart={2} justifySelf="center" />
    <GridItem
      as={HStack}
      spacing={[2, 4, 6, 8, '56px']}
      h="100%"
      mr={[4, 8, 12, 16, 24]}
      colStart={3}
      justifySelf="end"
    >
      <NavLink href="https://raisingtheroof.org/donate">Donate</NavLink>
      <NavLink as={RouterLink} to="/store">
        Shop
      </NavLink>
      <Divider orientation="vertical" h="60%" opacity={1} />
      <NavLink as={RouterLink} to="/store/cart">
        <BagIcon height="28px" width="28px" />
      </NavLink>
    </GridItem>
  </Grid>
);

export default Navbar;
