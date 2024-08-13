"use client"

import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Progress,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Question {
  id: keyof FormData;
  label: string;
  type: 'input' | 'textarea';
  isRequired: boolean;
}

interface FormData {
  projectName: string;
  projectPurpose: string;
  stakeholders: string;
  projectScope: string;
  userCharacteristics: string;
  userNeeds: string;
  functionalRequirements: string;
  nonFunctionalRequirements: string;
  techStack: string;
  integrations: string;
  timeline: string;
  importantEvents: string;
  risks: string;
  budget: string;
  communicationPlan: string;
  additionalNotes: string;
}

const questions: Question[] = [
  { id: 'projectName', label: 'プロジェクト名', type: 'input', isRequired: true },
  { id: 'projectPurpose', label: 'プロジェクトの目的', type: 'textarea', isRequired: true },
  { id: 'stakeholders', label: '主要な関係者', type: 'textarea', isRequired: true },
  { id: 'projectScope', label: 'プロジェクトの範囲', type: 'textarea', isRequired: true },
  { id: 'userCharacteristics', label: 'ユーザーの特徴', type: 'textarea', isRequired: true },
  { id: 'userNeeds', label: 'ユーザーのニーズと期待', type: 'textarea', isRequired: true },
  { id: 'functionalRequirements', label: '機能要件', type: 'textarea', isRequired: true },
  { id: 'nonFunctionalRequirements', label: '非機能要件', type: 'textarea', isRequired: true },
  { id: 'techStack', label: '使用する技術スタック', type: 'textarea', isRequired: true },
  { id: 'integrations', label: 'インテグレーション', type: 'textarea', isRequired: false },
  { id: 'timeline', label: 'プロジェクトのタイムライン', type: 'textarea', isRequired: true },
  { id: 'importantEvents', label: '重要なイベント', type: 'textarea', isRequired: false },
  { id: 'risks', label: '想定されるリスクと対策', type: 'textarea', isRequired: true },
  { id: 'budget', label: 'プロジェクト予算とコストブレイクダウン', type: 'textarea', isRequired: true },
  { id: 'communicationPlan', label: 'コミュニケーション計画', type: 'textarea', isRequired: true },
  { id: 'additionalNotes', label: '追加のメモ', type: 'textarea', isRequired: false },
];

export default function SpecificationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      projectName: '',
      projectPurpose: '',
      stakeholders: '',
      projectScope: '',
      userCharacteristics: '',
      userNeeds: '',
      functionalRequirements: '',
      nonFunctionalRequirements: '',
      techStack: '',
      integrations: '',
      timeline: '',
      importantEvents: '',
      risks: '',
      budget: '',
      communicationPlan: '',
      additionalNotes: '',
    }
  });

  const [currentStep, setCurrentStep] = React.useState(1);
  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    toast({
      title: "仕様書送信完了",
      description: "プロジェクト仕様書が正常に送信されました。",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const nextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = (question: Question) => {
    return (
      <FormControl key={question.id} isRequired={question.isRequired} isInvalid={!!errors[question.id]}>
        <FormLabel fontWeight="bold" color="blue.600">{question.label}</FormLabel>
        {question.type === 'input' ? (
          <Input {...register(question.id)} bg="white" borderColor="gray.300" />
        ) : (
          <Textarea {...register(question.id)} bg="white" borderColor="gray.300" />
        )}
      </FormControl>
    );
  };

  return (
    <Box bg="gray.50" minHeight="100vh" py={8}>
      <Container maxWidth="800px">
        <VStack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)} bg="white" p={6} borderRadius="md" boxShadow="sm">
          <Heading size="lg" color="blue.800">プロジェクト仕様書作成</Heading>
          <Text fontSize="sm" color="gray.600">ステップ {currentStep} / {questions.length}</Text>
          <Progress value={(currentStep / questions.length) * 100} width="100%" colorScheme="blue" />

          <Box width="100%" py={4}>
            {renderQuestion(questions[currentStep - 1])}
          </Box>

          <SimpleGrid columns={2} spacing={4} width="100%">
            <Button onClick={prevStep} isDisabled={currentStep === 1} colorScheme="gray">
              前へ
            </Button>
            {currentStep < questions.length ? (
              <Button onClick={nextStep} colorScheme="blue">次へ</Button>
            ) : (
              <Button type="submit" colorScheme="blue">送信</Button>
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
