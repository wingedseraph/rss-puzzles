<script lang="ts" setup>
const data = defineModel<string>()
</script>

<template>
    <input v-model="data" />
</template>

<style lang="css" scoped>
input {
    padding: 0.5rem;
    border: 1px solid transparent;
    border-radius: 4px;
    min-width: 232px;
}

input::placeholder {
    color: grey
}

input:focus {
    outline: none;
}
</style>