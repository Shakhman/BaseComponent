<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <TheComponent @search="onSearch" :header-props="hProps" :table-props="tProps" @clicked:fullscreen="hasF" :moduleSearch="moduleSearch">
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
import ComponentBuilder from './table/componentBuilder';

export default {
  data() {
    return {
      moduleSearch: {
        props: {    
          value: 'Name2',
        },
        on: {
          search: (e) => {
            console.log(e);
            this.moduleSearch = {...this.moduleSearch, props: { ...this.moduleSearch.props, label: e } }
          }
        }
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
    // TheComponent2: () => {
    //   return new ComponentBuilder().withView('table').then(self => {
    //     return self.build();
    //   });
    // }
  },
  methods: {
    onSearch(search) {
      this.moduleSearch.props.value = search
    },
    onSearch2(search) {
      console.log('search', search);
    },
    hasF(val) {
      console.log('hasF', val);
    }
  },
}
</script>