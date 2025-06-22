<template>
  <div class="min-h-screen container mx-auto mt-24">
    <div class="bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold text-primary mb-6 text-center">Register</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          :disabled="!username || !email || !password"
          class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");

const handleRegister = () => {
  console.log("Register attempt:", {
    username: username.value,
    email: email.value,
    password: password.value,
  });
  // Add your register logic here
};
</script>

<style scoped></style>
