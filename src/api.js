import axios from "axios";

const baseURL = 'http://localhost:3000';

const readTodos = async () => {
  try {
    let res = await axios.get(`${baseURL}/todos`);
    return res.data;
  } catch (error) {
    console.error("Error reading todos:", error);
    throw error;
  }
}

const createTodo = async (name) => {
  try {
    let res = await axios.post(`${baseURL}/todos`, { name });
    return res.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}

const doneTodo = async (id) => {
  try {
    let res = await axios.put(`${baseURL}/todos/${id}/done`);
    return res.data;
  } catch (error) {
    console.error("Error marking todo as done:", error);
    throw error;
  }
}

const undoneTodo = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/todos/${id}/done`);
    return res.data;
  } catch (error) {
    console.error("Error marking todo as undone:", error);
    throw error;
  }
}

const registerUser = async (username, password) => {
  try {
    let res = await axios.post(`${baseURL}/register`, { username, password });
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const loginUser = async (username, password) => {
  try {
    let res = await axios.post(`${baseURL}/login`, { username, password });
    return res.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export {
  readTodos,
  createTodo,
  doneTodo,
  undoneTodo,
  registerUser,
  loginUser
};
