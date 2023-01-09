<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <TheComponent :header-props="hProps" :table-props="tProps" @clicked:fullscreen="hasF" :moduleSearch="moduleSearch">
          <template #[`item.name`]="{ item: { name }}">
            {{ name }} from Slot
          </template>
        </TheComponent>
        <!-- <TheComponent2 @search="onSearch2" :header-props="hProps2" :table-props="tProps2">
        </TheComponent2> -->
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
        // props: {    
        //   value: 'Name2',
        // },
        // on: {
        //   onInput: (e) => {
        //     this.moduleSearch = {...this.moduleSearch, props: { value: e, label: e } }
        //   }
        // }
      },
      hProps: {
        title: 'Title 1',
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
      hProps2: {
        title: 'Title 2',
        modules: {
          search: {
            value: 'name',
            label: 'Label 2'
          }
        },
      },
      tProps2: {
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
    }
  },
  components: {
    TheComponent: async () => {
      const builder = await (new TableComponentBuilder()).withContext('table');
      return builder.withFullscreen().withSearch().build();
    },
    // TheComponent2: () => {
    //   return new TableComponentBuilder().withView('table').then(self => {
    //     return self.build();
    //   });
    // }
  },
  methods: {
    hasF(val) {
      console.log('hasF', val);
    }
  },
}
</script>