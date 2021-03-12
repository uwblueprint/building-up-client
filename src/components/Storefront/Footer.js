import React, { useState } from 'react';
import { Image, Text, Link, Button, HStack, VStack, Input, Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Footer = props => {
  const { subscribtionEmail, changeSubscriptionEmail } = useState();

  const subscribe = e => {
    e.preventDefault();
    changeSubscriptionEmail(e);
  };

  const updateSubscriptionEmail = e => {
    e.preventDefault();
    alert(subscribtionEmail);
  };

  return (
    <Box>
      <HStack backgroundColor="black" w="100%" display="flex" paddingTop="54px" paddingBottom="84px">
        <Image src="" alt="Small Icon" marginLeft="41px" />
        <HStack backgroundColor="black" w="100%" display="flex" justifyContent="space-between">
          <VStack w="191px" alignItems="flex-start" spacing="26px">
            <Text fontWeight="extrabold" letterSpacing="wider" color="white">
              GET IN TOUCH
            </Text>
            <Text color="white" fontFamily="Karla">
              116 Industry Street <br /> Suite 313 <br /> Toronto, ON M6M 4L8
            </Text>
            <Link href="mailto:info@raisingtheroof.org" color="white" fontFamily="Karla" fontWeight="normal">
              info@raisingtheroof.org
            </Link>
            <HStack spacing="5">
              <Link href="">
                <Image src="" alt="Facebook" />
              </Link>
              <Link href="">
                <Image src="" alt="Instagram" />
              </Link>
              <Link href="">
                <Image src="" alt="Youtube" />
              </Link>
              <Link href="">
                <Image src="" alt="LinkedIn" />
              </Link>
              <Link href="">
                <Image src="" alt="Twitter" />
              </Link>
            </HStack>
          </VStack>
          <VStack
            as="form"
            alignSelf="flex-end"
            w="444px"
            alignItems="flex-start"
            onSubmit={subscribe}
            marginRight="105px"
            spacing="26px"
          >
            <Text fontWeight="extrabold" letterSpacing="wider" color="white">
              STAY CONNECTED
            </Text>
            <Input
              placeholder="YOUR EMAIL ADDRESS*"
              borderColor="#7C7C7Cd"
              fontFamily="Karla"
              fontSize="12px"
              fontWeight="bold"
              letterSpacing="wider"
              borderRadius="0px"
              textColor="#7C7C7C"
              onChange={updateSubscriptionEmail}
            ></Input>
            <Text letterSpacing="wider" color="#7C7C7C" fontFamily="Karla" fontWeight="normal">
              In case you want to join the list of recipients of our news and updates, please fill in your email.
            </Text>
            <Button backgroundColor="white" borderRadius="0px" type="submit" padding="16px 35px">
              SUBSCRIBE <ChevronRightIcon backgroundColor="black" color="white" borderRadius="100%" marginLeft="11px" />
            </Button>
          </VStack>
        </HStack>
      </HStack>
      <Box backgroundColor="#BE2A1B" w="100%" paddingTop="31px" paddingBottom="26px">
        <HStack justifyContent="space-between" fontFamily="Karla" color="white" marginLeft="83px" marginRight="105px">
          <Text>2020 RAISING THE ROOF. ALL RIGHTS RESERVED. CHARTIABLE #139744569RR0001. </Text>
          <HStack fontWeight="normal" spacing="48px">
            <Link color="white">SITEMAP</Link>
            <Link color="white">PRIVACY POLICY </Link>
            <Link color="white">TERMS OF USE</Link>
            <Link color="white">SITE CREDITS</Link>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Footer;
