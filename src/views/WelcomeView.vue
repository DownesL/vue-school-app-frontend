<script lang="ts" setup></script>
<template>
  <h1>Welcome! Stay UpToDate!</h1>
  <div>
    <p>This is a site for people who...</p>
    <p>...love their kids and absolutely love the fact that they joined 132 different clubs.</p>
    <p>...that realize that they forget more than they remember.</p>
    <p>...who realy need all their letters in one place.</p>
  </div>
</template>
<style lang="scss" scoped>
div {
  margin-top: 2rem;
}
p {
  font-size: 1.2rem;
  max-width: 75ch;
  text-align: left;
  line-height: 2em;

  &:not(:first-of-type) {
    margin-left: 2rem;
  }
}
</style>
