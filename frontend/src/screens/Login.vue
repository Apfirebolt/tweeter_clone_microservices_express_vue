<template>
  <div class="min-h-screen container mx-auto mt-24">
    <div class="bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold text-primary mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
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
          :disabled="!email || !password"
          class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Login attempt:", {
    email: email.value,
    password: password.value,
  });
  // Add your login logic here
};
</script>

<style scoped></style>
