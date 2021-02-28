import React from 'react';
import { Link, Button, Flex, Heading, Icon, Image, VStack } from '@chakra-ui/react';
import { FiUsers } from 'react-icons/fi';
import { IoHomeOutline, IoPodiumOutline } from 'react-icons/io5';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import Logo from '../../../assets/logoWhite.png';

const NavItem = props => (
  <Link as={NavLink} to={props.to} _activeLink={{ color: 'white' }} _hover={{ color: 'white' }} textDecoration="none">
    <Heading size="h4" as="span">
      <Flex>
        <Icon as={props.icon} mr={2} />
        {props.children}
      </Flex>
    </Heading>
  </Link>
);

const Navbar = props => (
  <Flex
    as="nav"
    bg="background.secondary"
    direction="column"
    h="100%"
    px={12}
    py={20}
    justify="space-between"
    overflowX="hidden"
    textTransform="capitalize"
    role="navigation"
  >
    <VStack color="gray.400" spacing={10} align="flex-start">
      <Image src={Logo} alt="Raising The Roof Logo" w="100%" />
      <NavItem to="/home" icon={IoHomeOutline}>
        home
      </NavItem>
      <NavItem to="/leaderboard" icon={IoPodiumOutline}>
        leaderboard
      </NavItem>
      <NavItem to="/team" icon={FiUsers}>
        team
      </NavItem>
      <Button color="black" w="100%">
        Share Storefront
      </Button>
    </VStack>
    <Link as={RouterLink} to="/logout">
      <Heading as="span" color="white" size="h4">
        log out
      </Heading>
    </Link>
  </Flex>
);

export default Navbar;
