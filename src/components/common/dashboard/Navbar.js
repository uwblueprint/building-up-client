import { useApolloClient } from '@apollo/client';
import { Button, Flex, Heading, Icon, Image, Link, VStack } from '@chakra-ui/react';
import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { IoHomeOutline, IoPodiumOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../../assets/logoWhite.png';
import { logout } from '../../../data/actions/auth';

const NavItem = props => (
  <Link
    as={NavLink}
    to={props.to}
    color="gray.400"
    _activeLink={{ color: 'white' }}
    _hover={{ color: 'white' }}
    textDecoration="none"
  >
    <Heading size="h4" as="span">
      <Flex>
        <Icon as={props.icon} mr={2} />
        {props.children}
      </Flex>
    </Heading>
  </Link>
);

const Navbar = props => {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const {
    user: { teamId },
  } = useSelector(state => state.auth);

  const hasTeam = !!teamId;

  return (
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
          Home
        </NavItem>
        {hasTeam ? (
          <>
            <NavItem to="/leaderboard" icon={IoPodiumOutline}>
              Leaderboard
            </NavItem>
            <NavItem to="/team" icon={FiUsers}>
              Team
            </NavItem>
          </>
        ) : null}
        <Button color="black" w="100%">
          Share Storefront
        </Button>
      </VStack>
      <Link onClick={() => dispatch(logout(client))}>
        <Heading as="span" color="white" size="h4">
          Log Out
        </Heading>
      </Link>
    </Flex>
  );
};

export default Navbar;
