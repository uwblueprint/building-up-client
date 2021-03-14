import React, { useState } from 'react';
import { Heading, Image, Box, Center, Text, Link, Button, HStack, VStack, Icon, Input } from '@chakra-ui/react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaChevronCircleRight,
} from 'react-icons/fa';
import smallLogo from '../../assets/building_up_footer_small_icon.png';

const Footer = () => {
  const [subscribtionEmail, setSubscribtionEmail] = useState('');

  const handleSubscriptionEmailChange = e => {
    e.preventDefault();
    setSubscribtionEmail(e.target.value);
    console.log(subscribtionEmail);
  };

  const handleSubscriptionEmailSubmit = e => {
    e.preventDefault();
    alert(subscribtionEmail);
  };

  return (
    <Box color="white">
      <HStack backgroundColor="black" paddingLeft="41px" paddingTop="54px" paddingBottom="84px" paddingRight="105px">
        <Image src={smallLogo} alt="Small Icon" marginRight="47px" alignSelf="flex-start" />
        <HStack w="100%" h="100%" backgroundColor="black" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing="26px" h="100%" marginTop="0px">
            <Text fontWeight="extrabold" letterSpacing="wider" color="white" fontFamily="Jost">
              GET IN TOUCH
            </Text>
            <Text>
              116 Industry Street <br /> Suite 313 <br /> Toronto, ON M6M 4L8
            </Text>
            <Link href="mailto:info@raisingtheroof.org">info@raisingtheroof.org</Link>
            <HStack spacing="20px">
              <FaFacebookSquare fontSize="26px" />
              <FaInstagramSquare fontSize="26px" />
              <Center h="22px" w="22px" backgroundColor="white" borderRadius="2px" color="black">
                <FaYoutube />
              </Center>
              <FaLinkedin fontSize="26px" color="white" />
              <Center h="22px" w="22px" backgroundColor="white" borderRadius="2px" color="black">
                <FaTwitter />
              </Center>
            </HStack>
          </VStack>
          <VStack as="form" w="31%" alignItems="flex-start" onSubmit={handleSubscriptionEmailSubmit} spacing="26px">
            <Text fontWeight="extrabold" letterSpacing="wider" fontFamily="Jost">
              STAY CONNECTED
            </Text>
            <Input placeholder="YOUR EMAIL ADDRESS*" onChange={handleSubscriptionEmailChange} />
            <Text letterSpacing="wider" color="#7C7C7C">
              In case you want to join the list of recipients of our news and updates, please fill in your email.
            </Text>
            <Button size="sm" variant="inverted" color="black" rightIcon={<Icon as={FaChevronCircleRight} />}>
              <Heading size="subtitle"> SUBSCRIBE </Heading>
            </Button>
          </VStack>
        </HStack>
      </HStack>
      <HStack
        justifyContent="space-between"
        backgroundColor="#BE2A1B"
        paddingLeft="83px"
        paddingTop="31px"
        paddingBottom="26px"
        paddingRight="105px"
      >
        <Text>2020 RAISING THE ROOF. ALL RIGHTS RESERVED. CHARTIABLE #139744569RR0001. </Text>
        <HStack spacing="48px">
          <Link>PRIVACY POLICY </Link>
          <Link>TERMS OF USE</Link>
          <Link href="https://uwblueprint.org/">SITE CREDITS</Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Footer;
