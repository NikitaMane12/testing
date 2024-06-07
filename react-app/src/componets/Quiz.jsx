import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, resetQuiz } from "../reducers/quizSlice";
import { Box, Button, Text } from "@chakra-ui/react";

const Quiz = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, score } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      setTimeout(() => dispatch(resetQuiz()));
    }
  }, [currentQuestionIndex, questions.length, dispatch]);

  if (currentQuestionIndex >= questions.length) {
    return (
      <Box>
        <Text fontSize="xl">Quiz Completed!</Text>
        <Text fontSize="lg">
          Your Score: {score}/{questions.length}
        </Text>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect) => {
    dispatch(answerQuestion({ isCorrect }));
  };

  return (
    <Box>
      <Text fontSize="xl">{currentQuestion.question}</Text>
      <Box mt={4}>
        {currentQuestion.type === "multiple"
          ? currentQuestion.incorrect_answers
              .concat(currentQuestion.correct_answer)
              .sort()
              .map((answer, index) => (
                <Button
                  margin="10px"
                  key={index}
                  onClick={() =>
                    handleAnswer(answer === currentQuestion.correct_answer)
                  }
                >
                  {answer}
                </Button>
              ))
          : ["True", "False"].map((answer, index) => (
              <Button
                key={index}
                onClick={() =>
                  handleAnswer(answer === currentQuestion.correct_answer)
                }
              >
                {answer}
              </Button>
            ))}
      </Box>
    </Box>
  );
};

export default Quiz;
