<template>
  <ul>
    <li>
      <TodoInput @new-todo="post" />
    </li>
    <li v-for="(todo, i) in todos" :key="i">
      <Todo :todo="todo"
            @done="done"
            @undone="undone"
      />
    </li>
  </ul>
</template>

<script>
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  data() {
    return {
      todos: [],
      sortTodos: false // Feature toggle
    }
  },
  methods: {
    async getAll() {
      this.todos = await readTodos();
      if (this.sortTodos) {
        this.sortByDate();
      }
    },
    async post(name) {
      var todo = await createTodo(name);
      this.todos.push(todo);
      if (this.sortTodos) {
        this.sortByDate();
      }
    },
    async done(id) {
      var todo = await doneTodo(id);
      this.update(id, todo);
      if (this.sortTodos) {
        this.sortByDate();
      }
    },
    async undone(id) {
      var todo = await undoneTodo(id);
      this.update(id, todo);
      if (this.sortTodos) {
        this.sortByDate();
      }
    },
    update(id, todo) {
      this.todos.forEach((value, i) => {
        if (value.id === id) {
          this.todos[i] = todo;
        }
      });
    },
    sortByDate() {
      this.todos.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Logic to move unfinished todos to the next day
    }
  },
  created() {
    this.getAll();
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
