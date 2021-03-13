import React, { useState } from 'react';
import { Image, Center, Text, Link, Button, HStack, VStack, Input } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FaFacebookSquare, FaInstagramSquare, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa';
import smallLogo from '../../assets/building_up_footer_small_icon.png';

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
    <VStack spacing="0px">
      <HStack backgroundColor="black" w="100%" display="flex" paddingTop="54px" paddingBottom="84px">
        <Image src={smallLogo} alt="Small Icon" marginLeft="41px" marginRight="47px" alignSelf="flex-start" />
        <HStack backgroundColor="black" w="100%" display="flex" justifyContent="space-between">
          <VStack w="13%" alignItems="flex-start" spacing="26px">
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
              <FaFacebookSquare fontSize="26px" color="white" />
              <FaInstagramSquare fontSize="26px" color="white" />
              <Center h="22px" w="22px" backgroundColor="white" borderRadius="2px">
                <FaYoutube />
              </Center>
              <FaLinkedin fontSize="26px" color="white" />
              <Center h="22px" w="22px" backgroundColor="white" borderRadius="2px">
                <FaTwitter />
              </Center>
            </HStack>
          </VStack>
          <VStack
            as="form"
            alignSelf="flex-end"
            w="31%"
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
      <HStack
        justifyContent="space-between"
        fontFamily="Karla"
        color="white"
        backgroundColor="#BE2A1B"
        w="100%"
        paddingTop="31px"
        paddingBottom="26px"
      >
        <Text marginLeft="83px">2020 RAISING THE ROOF. ALL RIGHTS RESERVED. CHARTIABLE #139744569RR0001. </Text>
        <HStack fontWeight="normal" spacing="48px" marginRight="105px">
          <Link color="white">SITEMAP</Link>
          <Link color="white">PRIVACY POLICY </Link>
          <Link color="white">TERMS OF USE</Link>
          <Link color="white">SITE CREDITS</Link>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Footer;
