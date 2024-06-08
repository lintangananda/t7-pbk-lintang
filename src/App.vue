<template>
  <div>
    <header>
      <button @click="showPosts">Posts</button>
      <button @click="showTodos">Todos</button>
    </header>
    <Post v-if="view === 'posts'" :users="users" :selectedUser="selectedUser" :posts="posts" @update:selectedUser="updateSelectedUser" @fetchPosts="fetchPosts">
      <template #default="{ post }">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </template>
    </Post>
    <Todos v-else-if="view === 'todos'" :activities="activities" :showIncompleteOnly="showIncompleteOnly" @addActivity="addActivity" @cancelActivity="cancelActivity">
      <template #default="{ activity }">
        <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
      </template>
    </Todos>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Post from './components/post.vue';
import Todos from './components/todos.vue';

const view = ref('posts'); // Set initial view to 'posts'
const activities = ref([
  { id: 1, name: 'Cooking', completed: false },
  { id: 2, name: 'Feeding pets', completed: false }
]);
const showIncompleteOnly = ref(false);
const users = ref([]);
const selectedUser = ref(null);
const posts = ref([]);

function addActivity(activityName) {
  if (activityName.trim() !== '') {
    activities.value.push({ id: Date.now(), name: activityName, completed: false });
  }
}

function cancelActivity(id) {
  const index = activities.value.findIndex(activity => activity.id === id);
  if (index !== -1) {
    activities.value.splice(index, 1);
  }
}

function showPosts() {
  view.value = 'posts';
  if (selectedUser.value) {
    fetchPosts();
  }
}

function showTodos() {
  view.value = 'todos';
}

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data;
    })
    .catch(error => console.error('Error fetching users:', error));
}

function fetchPosts() {
  if (selectedUser.value) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
      .then(response => response.json())
      .then(data => {
        posts.value = data;
      })
      .catch(error => console.error('Error fetching posts:', error));
  }
}

function updateSelectedUser(userId) {
  selectedUser.value = userId;
  fetchPosts();
}

// Fetch users on component mount
fetchUsers();
</script>

<style scoped>
body {
  background-color: #ffd9e6;
  color: #333;
}

header {
  background-color: #ff69b4;
  padding: 10px;
  text-align: center;
  border-radius: 10px 10px 0 0;
}

header button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 8px;
  transition: background-color 0.3s ease;
}

header button:hover {
  background-color: #e55a9f;
}
</style>
