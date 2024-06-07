import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";

import "./App.css";
import QuizSetting from "./componets/QuizSetting";
import Quiz from "./componets/Quiz";
import Score from "./componets/Score";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <Container>
      <Box textAlign="center" mt={10}>
        {!quizStarted ? (
          <QuizSetting onStartQuiz={() => setQuizStarted(true)} />
        ) : (
          <Quiz />
        )}
      </Box>
      <Score />
    </Container>
  );
}

export default App;
