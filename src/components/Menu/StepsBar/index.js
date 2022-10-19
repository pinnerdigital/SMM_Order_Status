import { withStepProgress, useStepProgress, Step, StepProgressBar } from 'react-stepz';
import 'react-stepz/dist/index.css';
import { useState } from 'react';
import { Flex } from '@chakra-ui/react';

const stepBar = () => {
  const [isValid, setIsValid] = useState(false);

  const steps = [
    {
      name: 'step 1'
    },
    {
      name: 'step 2',
      validator: () => isValid
    },
    {
      name: 'step 3'
    },
    {
      name: 'step 4'
    },
  ];

  const { stepForward, stepBackwards, currentIndex } = useStepProgress({
    steps,
    startingStep: 3
  });

  return (
    <Flex w="100%" className="steps">
      <StepProgressBar stepClass="step" steps={steps} />
    </Flex>
  );
};

export default withStepProgress(stepBar);