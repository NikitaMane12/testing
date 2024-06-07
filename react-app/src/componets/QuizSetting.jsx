import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchQuestions } from "../reducers/quizSlice";
import {
  Box,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

const QuizSettings = ({ onStartQuiz }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.quiz.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [settings, setSettings] = useState({
    category: "",
    difficulty: "easy",
    type: "multiple",
    amount: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleStartQuiz = () => {
    dispatch(fetchQuestions(settings));
    onStartQuiz();
  };

  return (
    <Box>
      <FormControl id="category">
        <FormLabel>Category</FormLabel>
        <Select name="category" onChange={handleChange}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="difficulty">
        <FormLabel>Difficulty</FormLabel>
        <Select
          name="difficulty"
          onChange={handleChange}
          value={settings.difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
      </FormControl>
      <FormControl id="type">
        <FormLabel>Type</FormLabel>
        <RadioGroup name="type" onChange={handleChange} value={settings.type}>
          <Radio value="multiple">Multiple Choice</Radio>
          <Radio value="boolean">True/False</Radio>
        </RadioGroup>
      </FormControl>
      <FormControl id="amount">
        <FormLabel>Number of Questions</FormLabel>
        <NumberInput min={1} max={10} value={settings.amount}>
          <NumberInputField name="amount" onChange={handleChange} />
        </NumberInput>
      </FormControl>
      <Button mt={4} colorScheme="red" onClick={handleStartQuiz}>
        Start Quiz
      </Button>
    </Box>
  );
};

export default QuizSettings;
