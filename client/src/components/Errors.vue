<template>
  <div class="alert alert-message">
    {{ msg }}
  </div>
</template>

<script>
export default {
  props: ["msg"],
};
</script>

<style scoped>
.alert {
  border-radius: 5px;
  width: 30%;
  margin: auto;
}
.alert-message {
  background: red;
  color: #fff;
}
</style>
