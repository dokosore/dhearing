"use client"

import React from 'react';
import { Box, Flex, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
export const HEADER_HEIGHT = "60px";

const Header = () => {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box as="header" bg={bgColor} boxShadow="sm" height={HEADER_HEIGHT} position="fixed" width="full" zIndex="docked">
      <Flex maxW="7xl" mx="auto" px={4} py={3} align="center" justify="space-between">
        <Flex align="center">
          <Heading as="h1" size="lg" letterSpacing={'tighter'} color={textColor}>
            dheating
          </Heading>
        </Flex>
        <Flex>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => router.push('/')}
          >
            ダッシュボード
          </Button>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => router.push('/projects/new')}
          >
            仕様書作成
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
