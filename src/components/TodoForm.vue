<template>
  <div v-if="loading">
    Loading...
  </div>
  <form
      v-else
      @submit.prevent="onSave()"
  >

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control">
          <div
              v-if="subjectError"
              class="text-red"
          >{{subjectError}}</div>
        </div>

      </div>

      <div v-if="editing" class="col-6" >
        <div class="form-group">
          <label>Status</label>
          <div>
            <button class="btn"
                    type="button"
                    :class="todo.completed ? 'btn-success' : 'btn-danger'"
                    @click="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'Incomplete' }}
            </button>
          </div>
        </div>
      </div>

      <div  class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" id="" cols="30" rows="10"></textarea>
        </div>
      </div>

    </div>

    <button
        type="submit"
        class="btn btn-primary"
        :disabled="!todoUpdated"
    >
      {{ editing ? 'Update' : 'Create'}}
    </button>
    <button
        class="btn btn-outline-dark ml-2"
        @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>
  <transition name="fade">
    <Toast v-if="showToast"
           :message="toastMessage"
           :type="toastAlertType"
    />
  </transition>
</template>

<script>
import  { useRoute, useRouter } from 'vue-router';
import axios from "axios";
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from "@/components/Toast";
import {useToast} from "@/domposables/toast";


export default {
  components: {
    Toast
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    }

  },

  setup(props) {

    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    });
    const subjectError = ref('');
    const originalTodo = ref(null);
    const loading = ref(false);
    const todoId = route.params.id;

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();

    const getTodo =  async () => {
      loading.value = true;

      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    })

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos'
      });
    };

    if (props.editing) {
      getTodo();
    }

    const onSave = async () => {
      try {
        subjectError.value = '';
        if (!todo.value.subject) {
          subjectError.value = 'Subejct is required'
          return;
        }

        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        }
        if (props.editing) {
          res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
          originalTodo.value = {...res.data};

        } else {
          res = await axios.post(`http://localhost:3000/todos`, data);
          todo.value.subject = '';
          todo.value.body = '';
        }

        const message = 'Succesfully '+ (props.editing ? 'Updated!!' : 'Created!!');
        triggerToast(message);

        console.log(res)
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong','danger')
      }

    }

    return {
      todo,
      originalTodo,
      todoUpdated,
      loading,
      moveToTodoListPage,
      onSave,
      toggleTodoStatus,
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast,
      subjectError,
    }
  }

}
</script>

<style scoped>
  .text-red {
    color: red;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-leave-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(0px);
  }

</style>