<template>
<div>
 	<h1>Deck page</h1>
 	<button @click="next">Next page</button>
 	</div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    next: function (event) {
      // `this` inside methods point to the Vue instance
      this.$router.push('/decks/123');
    }
  }
}
</script>
