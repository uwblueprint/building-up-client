import React, { useState } from 'react';
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import LoginInput from '../../components/LoginRegister/LoginInput';
import RegisterInput from '../../components/LoginRegister/RegisterInput';
import logo from '../../images/logo-black.png';

function LoginRegister() {
  const [loginRegister, setLoginRegister] = useState('login');

  return (
    <Flex h="100vh" w="100vw" justify="center" bg="background.login">
      <Box minW="35%">
        <Flex justify="center" marginTop="36px" marginBottom="36px">
          <Image src={logo} w="350px"/>
        </Flex>
        <Box borderRadius="lg" borderWidth="1px" bg="white">
          <Flex direction="row" justify="space-between" margin="20px 100px 24px 100px">
            <Box>
              <Button
                opacity={loginRegister === 'login' ? '1' : '0.5'}
                variant="unstyled"
                _focus={{
                  outline: 'none',
                }}
                _hover={{
                  color: 'brand.50',
                }}
                onClick={() => setLoginRegister('login')}
              >
                Sign In
              </Button>
              {loginRegister === 'login' && <Box bg="brand.50" h="5px" borderRadius="sm"></Box>}
            </Box>
            <Box>
              <Button
                opacity={loginRegister === 'register' ? '1' : '0.5'}
                variant="unstyled"
                _focus={{
                  outline: 'none',
                }}
                _hover={{
                  color: 'brand.50',
                }}
                onClick={() => setLoginRegister('register')}
              >
                Join
              </Button>
              {loginRegister === 'register' && <Box bg="brand.50" h="5px" borderRadius="sm"></Box>}
            </Box>
          </Flex>
          <Box margin="0px 48px 40px 48px">{loginRegister === 'login' ? <LoginInput /> : <RegisterInput />}</Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginRegister;
