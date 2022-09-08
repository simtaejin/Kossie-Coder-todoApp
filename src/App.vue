<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <TodoList :todos="todos"
              @toggle-todo="toggleTodo"
              @delete-todo="deleteTodo"
    />

  </div>
</template>
<script>
  import { ref } from "vue";
  import TodoSimpleForm from "@/components/TodoSimpleForm";
  import TodoList from "@/components/TodoList";

  export default {
    components: {
      TodoSimpleForm,
      TodoList
    },
    setup() {

      const todos = ref([]);

      const addTodo = (todo) => {
        todos.value.push(todo);

      };

      const toggleTodo = (index) => {
        console.log(todos.value[index].completed);
        todos.value[index].completed = !todos.value[index].completed;
        console.log(todos.value[index].completed);
      };

      const deleteTodo = (index) => {
        todos.value.splice(index, 1);
      };

      return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
      };

    }
  }
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>