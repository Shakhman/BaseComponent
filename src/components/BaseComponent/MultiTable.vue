<template>
  <v-row>
    <v-col v-for="(data, k) in propsList" :key="k" :col="12 / propsList.length">
    <RegularTable v-bind="data" @update:options="onUpdateOptions($event, k)" :options="options[k]" :search="search">
    </RegularTable>
    </v-col>
  </v-row>
</template>

<script>
import RegularTable from './RegularTable.vue';

export default {
  props: {
    options: {
      type: Object,
    },
    search: {
      type: String,
    },
    propsList: {
      type: Array,
      required: true,
    }
  },
  components: {
    RegularTable,
  },
  data() {
    return {
      tempOptions: {},
    }
  },
  methods: {
    onUpdateOptions(options, index) {
      this.tempOptions[index] = options
      this.$emit('update:options', this.tempOptions);
    }
  }
}
</script>

<style lang="sass" scoped>

</style>