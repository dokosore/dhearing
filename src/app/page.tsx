"use client"
import React, { useMemo } from 'react';
import { Box, SimpleGrid, Heading, Text, VStack, Link } from '@chakra-ui/react';

interface BentoBoxProps {
  title: string;
  emoji: string;
  description: string;
  href: string;
}

const BentoBox = React.memo(({ title, emoji, description, href }: BentoBoxProps) => {
  return (
    <Link href={href} textDecoration="none" _hover={{ textDecoration: 'none' }}>
      <Box
        bg="white"
        p={3}
        borderRadius="md"
        boxShadow="sm"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="full"
        transition="all 0.3s"
        _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
      >
        <VStack spacing={2}>
          <Text fontSize="2xl">{emoji}</Text>
          <Heading size="sm" color="blue.600" textAlign="center">{title}</Heading>
          <Text fontSize="xs" color="gray.600" textAlign="center" noOfLines={2}>{description}</Text>
        </VStack>
      </Box>
    </Link>
  );
});


const Dashboard = React.memo(() => {
  const bentoItems = useMemo(() => [
    { title: "仕様書作成", emoji: "📄", description: "新しいプロジェクトの仕様書を作成", href: "/projects/new" },
    { title: "プロジェクト一覧", emoji: "📋", description: "すべてのプロジェクトを表示", href: "/projects" },
  ], []);

  return (
    <Box p={4} minHeight="100vh">
      <Heading mb={4} textAlign="center" color="blue.800" size="lg">ダッシュボード</Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
        spacing={4}
        mx={{ base: 4, md: 8, lg: 16 }}
      >
        {bentoItems.map((item, index) => (
          <BentoBox key={index} {...item} />
        ))}
      </SimpleGrid>
    </Box>
  );
});

BentoBox.displayName = 'BentoBox';
Dashboard.displayName = 'Dashboard';

export default Dashboard;
