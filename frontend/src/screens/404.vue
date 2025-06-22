<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 class="text-9xl font-bold">404</h1>
        <p class="text-2xl mt-4">Page Not Found</p>
        <p class="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
        <router-link
            to="/"
            class="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
            Go Back Home
        </router-link>
    </div>
</template>

<script>
export default {
    name: "NotFoundPage",
};
</script>

<style scoped>
</style>