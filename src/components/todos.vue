<template>
  <div class="todo-app">
    <h1>To Do List</h1>
    <form @submit.prevent="onAddActivity">
      <input type="text" v-model="newActivity" placeholder="Add New Activity">
      <button type="submit">Add Task</button>
    </form>
    <ul class="activities-list">
      <li v-for="activity in filteredActivities" :key="activity.id">
        <input type="checkbox" v-model="activity.completed">
        <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <button @click="onCancelActivity(activity.id)">Delete</button>
      </li>
    </ul>
    <label>
      <input type="checkbox" v-model="showIncompleteOnly">
      Unfinished
    </label>
    <p>Unfinished tasks: {{ incompleteActivitiesCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodosStore } from '../stores/todosStore';

const todosStore = useTodosStore();
const newActivity = ref('');

const filteredActivities = computed(() => {
  if (todosStore.showIncompleteOnly) {
    return todosStore.activities.filter(activity => !activity.completed);
  } else {
    return todosStore.activities;
  }
});

const incompleteActivitiesCount = computed(() => todosStore.incompleteActivitiesCount);

function onAddActivity() {
  if (newActivity.value.trim() !== '') {
    todosStore.addActivity(newActivity.value);
    newActivity.value = '';
  }
}

function onCancelActivity(id) {
  todosStore.cancelActivity(id);
}

const showIncompleteOnly = computed({
  get() {
    return todosStore.showIncompleteOnly;
  },
  set(value) {
    todosStore.showIncompleteOnly = value;
  }
});
</script>

<style scoped>
.todo-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #ffd9e6;
  padding: 40px;
  width: 100%;
  box-sizing: border-box;
}

h1 {
  color: #ff69b4;
  font-size: 40px;
  font-family: Georgia, serif;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  border: none;
  border-radius: 6px;
  outline: none;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #ff69b4;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #e55a9f;
}

.activities-list {
  width: 100%;
  max-width: 600px;
  padding: 0;
  list-style-type: none;
}

.activities-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activities-list li button {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #ff69b4;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.activities-list li button:hover {
  background-color: #e55a9f;
}

.activities-list li .completed {
  text-decoration: line-through;
  color: #888;
}
</style>
