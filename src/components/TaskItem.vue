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
          <span v-if="isComplete">
            <i class="fa-solid fa-square-check fa-xl fa-inverse"></i>
          </span>
          <span v-else
            ><i class="fa-solid fa-square fa-xl fa-inverse"></i
          ></span>
        </button>
      </li>
      <li v-if="!isEditing">
        <button class="edit" @click="editButton">
          <i class="fa-solid fa-pencil fa-xl fa-inverse"></i>
        </button>
      </li>
      <li v-if="!isEditing">
        <button class="delete" @click="deleteTask">
          <i class="fa-solid fa-trash fa-xl fa-inverse"></i>
        </button>
      </li>
      <li v-if="isEditing">
        <button class="save" @click="saveButton">
          <i class="fa-solid fa-cloud-arrow-up fa-xl fa-inverse"></i>
        </button>
      </li>
      <li v-if="isEditing">
        <button class="cancel" @click="cancelButton">
          <i class="fa-solid fa-rotate-left fa-xl fa-inverse"></i>
        </button>
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
  background: #364d37;
  margin-top: 20px;
  padding: 10px;
}
.task:hover {
  scale: 1.1;
  transition: 0.2s ease-in-out;
}
button:hover {
  scale: 1.1;
  transition: 0.2s ease-in-out;
}
h3 {
  font-size: 24px;
  margin-bottom: 5px;
}
button {
  width: 48px;
  padding: 5px;
  margin-bottom: 5px;
}
.done {
  background: #4caf50;
}
.edit {
  background: var(--color-purple);
}
.delete {
  background: var(--color-red);
}
.save {
  background: #4caf50;
}
.cancel {
  background: var(--color-red);
}

.delete {
  margin-bottom: 0;
}
.editing h3,
.editing p {
  outline: 1px solid white;
}
</style>
