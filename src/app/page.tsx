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

export default function Home() {
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormData>({
    defaultValues: {  // Initialize all field values to empty string
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
        <FormLabel>{question.label}</FormLabel>
        {question.type === 'input' ? (
          <Input {...register(question.id)} />
        ) : (
          <Textarea {...register(question.id)} />
        )}
      </FormControl>
    );
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading>プロジェクト仕様書</Heading>
        <Text>ステップ {currentStep} / {questions.length}</Text>
        <Progress value={(currentStep / questions.length) * 100} width="100%" />

        {renderQuestion(questions[currentStep - 1])}

        <Box width="100%" display="flex" justifyContent="space-between">
          <Button onClick={prevStep} isDisabled={currentStep === 1}>
            前へ
          </Button>
          {currentStep < questions.length ? (
            <Button onClick={nextStep}>次へ</Button>
          ) : (
            <Button type="submit" colorScheme="blue">
              送信
            </Button>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
