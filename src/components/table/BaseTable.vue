<template>
  <v-data-table :items="items" :headers="headers" :search="search" v-bind="options"
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
        default: () => ({
          page: 1,
          itemsPerPage: 10,
          sortBy: [],
          sortDesc: [],
          groupBy: [],
          groupDesc: [],
          multiSort: false,
          mustSort: false
        })
      },
    },
    data() {
      return {
        tempOptions: {},
      }
    },
    methods: {
      onOptionsUpdate(options) {
        this.tempOptions = options;

        this.$emit('update:options', this.tempOptions);
      }
    },
  }
</script>

<style lang="sass" scoped>

</style>