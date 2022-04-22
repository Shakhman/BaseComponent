<template>
  <div id="search">
    <v-text-field :value="value" :label="label" v-on="$listeners">
    </v-text-field>
</div>
</template>

<script>
export default {
  name: 'SearchField',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Search',
    }
  },
}
</script>

<style lang="scss" scoped>

</style>