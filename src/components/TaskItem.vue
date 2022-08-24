<template>
  <article class="task" :class="{ editing: isEditing }">
    <div>
      <h3 :contenteditable="isEditing" @input="onTitleInput">
        {{ title }}
      </h3>
      <p :contenteditable="isEditing" @input="onDescriptionInput">
        {{ description }}
      </p>
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <menu>
      <li v-if="!isEditing">
        <button class="done" @click="doneTask">
          <span v-if="isComplete">✅</span>
          <span v-else>⬜️</span>
        </button>
      </li>
      <li v-if="!isEditing">
        <button class="edit" @click="editButton">Edit</button>
      </li>
      <li v-if="!isEditing">
        <button class="delete" @click="deleteTask">Delete</button>
      </li>
      <li v-if="isEditing">
        <button class="save" @click="saveButton">Save</button>
      </li>
      <li v-if="isEditing">
        <button class="cancel" @click="cancelButton">Cancel</button>
      </li>
    </menu>
  </article>
</template>

<script setup>
import { useTaskStore } from "../stores/task.js";
import { ref } from "vue";

const taskStore = useTaskStore();
const props = defineProps(["title", "description", "id", "isComplete"]);
const errorMessage = ref("");
const isEditing = ref(false);
const title = ref(props.title);
const description = ref(props.description);

async function doneTask() {
  try {
    await taskStore.updateTask(
      props.id,
      props.title,
      props.description,
      !props.isComplete
    );
  } catch (error) {
    // displays error message
    errorMessage.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
}

async function deleteTask() {
  try {
    await taskStore.deleteTask(props.id);
  } catch (error) {
    // displays error message
    errorMessage.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
}
function onTitleInput(event) {
  title.value = event.target.innerText;
}
function onDescriptionInput(event) {
  description.value = event.target.innerText;
}
function cancelButton() {
  isEditing.value = false;
  title.value = props.title;
  description.value = props.description;
}
function editButton() {
  isEditing.value = true;
}
async function saveButton() {
  try {
    await taskStore.updateTask(
      props.id,
      title.value,
      description.value,
      props.isComplete
    );
    isEditing.value = false;
  } catch (error) {
    // displays error message
    errorMessage.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
}
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  background: rgb(219, 162, 219);
  margin-top: 20px;
  padding: 10px;
}
h3 {
  font-size: 24px;
  margin-bottom: 5px;
}
button {
  background: rgb(182, 68, 182);
  width: 60px;
  padding: 5px;
  margin-bottom: 5px;
}
.delete {
  margin-bottom: 0;
}
.editing h3,
.editing p {
  background-color: #69ffb4;
  outline: 1px solid hotpink;
}
</style>
