<template>
  <ul>
    <li>
      <TodoInput @new-todo="post" />
    </li>
    <li v-for="(todo, i) in todos">
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
import {createTodo, doneTodo, readTodos, undoneTodo} from "@/api";

export default {
  name: "TodoList",
  components: {TodoInput, Todo},
  data() {
    return {
      todos: []
    }
  },
  methods: {
    async getAll() {
      this.todos = await readTodos();
    },
    async post(name) {
      var todo = await createTodo(name);
      this.todos.push(todo);
    },
    async done(id) {
      var todo = await doneTodo(id);
      this.update(id, todo);
    },
    async undone(id) {
      var todo = await undoneTodo(id);
      this.update(id, todo);
    },
    update(id, todo) {
      this.todos.forEach((value, i) => {
        if (value.id === id) {
          this.todos[i] = todo;
        }
      });
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