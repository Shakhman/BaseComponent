<template>
  <v-data-table :items="items" :headers="headers" :search="search" v-bind="mergedOptions"
    @update:options="onOptionsUpdate"
  >
    <slot
      v-for="(_, name) in $slots"
      :slot="name"
      :name="name"
    />
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>
  </v-data-table>
</template>

<script>
const initialOptions = () => ({
  page: 1,
  itemsPerPage: 10,
  sortBy: ['name'],
  sortDesc: [true],
  groupBy: [],
  groupDesc: [],
  multiSort: false,
  mustSort: false
});

  export default {
    props: {
      search: {
        type: String,
        default: ''
      },
      items: {
        type: Array,
        required: true,
      },
      headers: {
        type: Array,
        required: true,
      },
      options: {
        type: Object,      
      },
    },
    computed: {
      mergedOptions() {
        return {
          ...initialOptions(),
          ...this.options,
        }
      }
    },
    methods: {
      onOptionsUpdate(options) {
        this.$emit('update:options', options);
      }
    },
  }
</script>

<style lang="sass" scoped>

</style>