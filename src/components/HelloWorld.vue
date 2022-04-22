<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <TheComponent @search="onSearch" :header-props="hProps" :table-props="tProps">
        </TheComponent>
        <TheComponent2 @search="onSearch2" :header-props="hProps2" :table-props="tProps2">
        </TheComponent2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComponentBuilder from './table/componentBuilder';

export default {
  data() {
    return {
      hProps: {
        title: 'Title 1',
        modules: {
          search: {
            value: '',
            label: 'Label'
          }
        },
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
    TheComponent: () => {
      return new ComponentBuilder().withView('table').then(self => {
        return self.withSearch().withFullscreen().build();
      });
    },
    TheComponent2: () => {
      return new ComponentBuilder().withView('table').then(self => {
        return self.withSearch().withFullscreen().build();
      });
    }
  },
  methods: {
    onSearch(search) {
      console.log('search2', search);
    },
    onSearch2(search) {
      console.log('search', search);
    },
  }
}
</script>