<template>
  <div id="search">
    <v-text-field :value="moduleSearchProps.value" :label="moduleSearchProps.label" v-on="$listeners">
    </v-text-field>
</div>
</template>

<script>
export default {
  name: 'SearchField',
  props: {
    moduleSearchProps: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>

</style>