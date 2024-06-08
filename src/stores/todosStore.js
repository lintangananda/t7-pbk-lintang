import { defineStore } from 'pinia';
import { ref, computed } from 'vue';


export const useTodosStore = defineStore('todosStore', () => {
  const activities = ref([
    { id: 1, name: 'Cooking', completed: false },
    { id: 2, name: 'Feeding pets', completed: false }
  ]);
  const showIncompleteOnly = ref(false);

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

  const incompleteActivitiesCount = computed(() => {
    return activities.value.filter(activity => !activity.completed).length;
  });

  return {
    activities,
    showIncompleteOnly,
    addActivity,
    cancelActivity,
    incompleteActivitiesCount
  };
});
