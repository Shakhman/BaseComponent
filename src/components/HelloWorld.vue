<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <TheComponent :header-props="hProps" :table-props="tProps" @clicked:fullscreen="hasF" :moduleSearch="moduleSearch">
          <template #[`item.name`]="{ item: { name }}">
            {{ name }} from Slot
          </template>
        </TheComponent>
        <TheComponent2 :table-props="tProps2" :header-props="hProps2" :moduleSearch="moduleSearch2">
        </TheComponent2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableComponentBuilder from './BaseComponent/TableComponentBuilder.js';

export default {
  data() {
    return {
      moduleSearch: {
        props: {    
          value: 'Name2',
        },
        on: {
          onInput: (e) => {
            this.moduleSearch = {...this.moduleSearch, props: { value: e, label: e } }
          }
        }
      },
      moduleSearch2: {
        props: {    
          value: 'Name2',
        },
        on: {
          onInput: (e) => {
            this.moduleSearch2 = {...this.moduleSearch2, props: { value: e, label: e } }
          }
        }
      },
      hProps: {
        title: 'Title 1',
      },
      hProps2: {
        title: 'Multi Table',
      },
      tProps: {
        resizableColumns: [1, 3],
        headers: [
          {
            value: 'name',
            text: 'Name'
          },
          {
            value: 'type',
            text: 'Type'
          },
        ],
        items: [
          {
            name: 'Name',
            type: 'type',
          },
          {
            name: 'Name2',
            type: 'type2',
          },
        ],
        options: {sortBy: ['type']}
      },
      tProps2: {
        propsList: [
        {
          headers: [
          {
            value: 'name',
            text: 'Name'
          },
          {
            value: 'type',
            text: 'Type'
          },
          {
            value: 'status',
            text: 'Status'
          },
        ],
        items: [
          {
            name: 'Name',
            type: 'type',
            status: 'w'
          },
          {
            name: 'Name2',
            type: 'type2',
            status: 'n'
          },
        ],
        },
        {
          headers: [
          {
            value: 'name',
            text: 'Name2'
          },
          {
            value: 'type',
            text: 'Type2'
          },
          {
            value: 'status',
            text: 'Status2'
          },
        ],
        items: [
          {
            name: 'Name22',
            type: 'type',
            status: 'w'
          },
          {
            name: 'Name222',
            type: 'type2',
            status: 'n'
          },
        ],
        },
      ]
      },
    }
  },
  components: {
    TheComponent: async () => {
      const builder = await (new TableComponentBuilder()).withContext('regular');
      return builder.withFullscreen().withSearch().build();
    },
    TheComponent2: async () => {
      const builder = await (new TableComponentBuilder()).withContext('multi-table');
      return builder.withFullscreen().withSearch().build();
    },
  },
  methods: {
    hasF(val) {
      console.log('hasF', val);
    }
  },
}
</script>