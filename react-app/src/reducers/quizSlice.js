// quizSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "quiz/fetchCategories",
  async () => {
    const response = await axios.get("https://opentdb.com/api_category.php");
    return response.data.trivia_categories;
  }
);

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async ({ amount, category, difficulty, type }) => {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount,
        category,
        difficulty,
        type,
      },
    });
    return response.data.results;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    categories: [],
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    answerQuestion: (state, action) => {
      const { isCorrect } = action.payload;
      if (isCorrect) {
        state.score += 1;
      }
      state.currentQuestionIndex += 1;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { answerQuestion, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;
