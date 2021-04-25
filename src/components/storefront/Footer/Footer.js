import React, { useState } from 'react';
import { Image, Box, Center, Flex, Text, Link, Button, HStack, Stack, VStack, Icon, Input } from '@chakra-ui/react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
  FaLinkedin,
  FaTwitterSquare,
  FaChevronCircleRight,
} from 'react-icons/fa';
import smallLogo from 'assets/images/building_up_footer_small_icon.png';

const PADDING_X = { base: 10, md: 14, lg: 16, xl: '105px' };
const PADDING_Y = { base: 8, md: 12, lg: 14, xl: '60px' };

const GetInTouch = () => {
  return (
    <Flex align="flex-start" flex="1">
      <Image src={smallLogo} alt="Small Icon" marginRight={{ base: 8, sm: '47px' }} />
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
    </Flex>
  );
};

const StayConnected = () => {
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
    <VStack as="form" alignItems="flex-start" onSubmit={handleSubscriptionEmailSubmit} spacing="26px" flex="1">
      <Text fontWeight="extrabold" letterSpacing="wider" fontFamily="Jost">
        STAY CONNECTED
      </Text>
      <Input
        borderColor="brand.gray"
        _hover={{ borderColor: 'brand.lightgray' }}
        _focus={{ borderColor: 'brand.lightgray' }}
        placeholder="YOUR EMAIL ADDRESS*"
        onChange={handleSubscriptionEmailChange}
      />
      <Text letterSpacing="wider" color="brand.gray">
        In case you want to join the list of recipients of our news and updates, please fill in your email.
      </Text>
      <Button size="sm" type="submit" variant="inverted" color="black" rightIcon={<Icon as={FaChevronCircleRight} />}>
        SUBSCRIBE
      </Button>
    </VStack>
  );
};

const FooterTop = () => {
  return (
    <Stack
      bg="black"
      px={PADDING_X}
      py={PADDING_Y}
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align={{ base: 'center', md: 'flex-start' }}
      spacing={12}
      overflow="auto"
    >
      <GetInTouch />
      <StayConnected />
    </Stack>
  );
};

const FooterBottom = () => {
  return (
    <Center bg="brand.red" px={PADDING_X} minH="100px">
      <HStack bg="brand.red" overflow="auto" justifyContent="space-between" spacing={8}>
        <Text>2020 RAISING THE ROOF. ALL RIGHTS RESERVED. CHARITABLE #139744569RR0001. </Text>
        <Link href="https://raisingtheroof.org/privacy-policy/">PRIVACY POLICY </Link>
        <Link href="https://raisingtheroof.org/terms-of-use/">TERMS OF USE</Link>
        <Link href="https://uwblueprint.org/" isExternal>
          SITE CREDITS
        </Link>
      </HStack>
    </Center>
  );
};

const Footer = () => {
  return (
    <Box color="white" maxW="100vw">
      <FooterTop />
      <FooterBottom />
    </Box>
  );
};

export default Footer;
