<script lang="ts">
export default {
  name: "Button",
};
</script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use "./src/assets/theme";
.button {
  outline: none;
  background-color: theme.$color-primary;
  color: theme.$color-dark;
  padding: 1rem 2rem;
  transition: all 230ms ease-in-out;
  font-size: 1.2rem;
  line-height: 1;
  box-shadow: 0 3px 6px #00000066;
  font-weight: bold;
  font-family: theme.$font-family-main;
  border: none;
  display: flex;
  gap: 0.75rem;
  align-items: center;

  &:not([disabled]) {
    cursor: pointer;
  }

  &:not([disabled]):hover {
    background-color: lighten(theme.$color-primary, 10%);
  }
}
</style>
