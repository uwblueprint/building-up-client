import React, { useState } from 'react';
import { Image, Box, Center, Flex, Text, Link, Button, HStack, VStack, Icon, Input } from '@chakra-ui/react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
  FaLinkedin,
  FaTwitterSquare,
  FaChevronCircleRight,
} from 'react-icons/fa';
import smallLogo from '../../assets/building_up_footer_small_icon.png';

const Footer = () => {
  const [subscriptionEmail, setSubscriptionEmail] = useState('');

  const handleSubscriptionEmailChange = e => {
    e.preventDefault();
    setSubscriptionEmail(e.target.value);
  };

  const handleSubscriptionEmailSubmit = e => {
    e.preventDefault();
    alert(subscriptionEmail);
  };

  return (
    <Box color="white">
      <Flex backgroundColor="black" py="80px" px="105px">
        <Image src={smallLogo} alt="Small Icon" marginRight="47px" alignSelf="flex-start" />
        <HStack w="100%" h="100%" justifyContent="space-between" alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="26px" h="100%" marginTop="0px">
            <Text fontWeight="extrabold" letterSpacing="wider" color="white" fontFamily="Jost">
              GET IN TOUCH
            </Text>
            <Text>
              116 Industry Street <br /> Suite 313 <br /> Toronto, ON M6M 4L8
            </Text>
            <Link href="mailto:info@raisingtheroof.org">info@raisingtheroof.org</Link>
            <HStack spacing="20px">
              <Link href="https://www.facebook.com/RaisingtheRoof/" isExternal>
                <FaFacebookSquare fontSize="26px" />
              </Link>
              <Link href="https://www.instagram.com/raisingtheroof_cheztoit/?hl=en" isExternal>
                <FaInstagramSquare fontSize="26px" />
              </Link>
              <Link href="https://www.youtube.com/user/RaisingtheRoofCanada" isExternal>
                <Center h="22px" w="22px" backgroundColor="white" borderRadius="2px" color="black">
                  <FaYoutube />
                </Center>
              </Link>
              <Link href="https://www.linkedin.com/company/raising-the-roof/about/" isExternal>
                <FaLinkedin fontSize="26px" color="white" />
              </Link>
              <Link href="https://twitter.com/RaisingTheRoof" isExternal>
                <FaTwitterSquare fontSize="26px" />
              </Link>
            </HStack>
          </VStack>
          <VStack as="form" w="31%" alignItems="flex-start" onSubmit={handleSubscriptionEmailSubmit} spacing="26px">
            <Text fontWeight="extrabold" letterSpacing="wider" fontFamily="Jost">
              STAY CONNECTED
            </Text>
            <Input placeholder="YOUR EMAIL ADDRESS*" onChange={handleSubscriptionEmailChange} />
            <Text letterSpacing="wider" color="brand.gray">
              In case you want to join the list of recipients of our news and updates, please fill in your email.
            </Text>
            <Button
              size="sm"
              type="submit"
              variant="inverted"
              color="black"
              rightIcon={<Icon as={FaChevronCircleRight} />}
            >
              SUBSCRIBE
            </Button>
          </VStack>
        </HStack>
      </Flex>
      <HStack justifyContent="space-between" bg="#BE2A1B" px="105px" py="30px">
        <Text>2020 RAISING THE ROOF. ALL RIGHTS RESERVED. CHARTIABLE #139744569RR0001. </Text>
        <HStack spacing="48px">
          <Link href="https://raisingtheroof.org/privacy-policy/">PRIVACY POLICY </Link>
          <Link href="https://raisingtheroof.org/terms-of-use/">TERMS OF USE</Link>
          <Link href="https://uwblueprint.org/" isExternal>
            SITE CREDITS
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Footer;
