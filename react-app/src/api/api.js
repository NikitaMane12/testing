import axios from "axios";

const API_BASE_URL = "https://opentdb.com";

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/api_category.php`);
  return response.data.trivia_categories;
};

export const fetchQuestions = async (amount, category, difficulty, type) => {
  const response = await axios.get(`${API_BASE_URL}/api.php`, {
    params: {
      amount,
      category,
      difficulty,
      type,
    },
  });
  console.log(response);
  return response.data.results;
};
