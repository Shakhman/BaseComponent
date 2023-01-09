import searchInitProps from './modules/initialProps/searchProps';
import Vue from 'vue';


const composedModuleSearch = Vue.observable({on: {}, props: {}});

export default class TableComponentComposer {
  constructor(BaseComponent, ContextComponent) {
    this.context = ContextComponent;
    this.BaseComponent = BaseComponent;
    // this.componentHOCs = componentHOCs;
    // this.contextHOCs = contextHOCs;
  }

  // async wrapHOCs() {
  //   this.componentHOCs.forEach(async (hocName) => {
  //     const hoc = await import(`./modules/hocs/${hocName}.js`);
  //     this.BaseComponent = hoc.default.call(null, this.BaseComponent);
  //   });

  //   return this;
  // }

  getComposedComponent() {
    const { context, BaseComponent } = this;

    return {
      name: 'TableComponentComposer',
      props: {
        headerProps: {
          type: Object,
        },
        tableProps: {
          type: Object,
        },
        moduleSearch: {
          type: Object,
          default: () => ({ on: {}, props: {} })
        },
      },
      data() {
        return {
          composedSearch: '',
          composedOptions: {},
        }
      },
      render(h) {
        composedModuleSearch.on = this.moduleSearch.on,
        composedModuleSearch.props = { ...searchInitProps(), ...this.moduleSearch.props }
        
        return h(BaseComponent, {
          props: {
            ...this.headerProps,
            ...this.$props,
            moduleSearch: composedModuleSearch
          },
          on: {
            ...this.$listeners,
            'bc::search:input': (e) => {
              this.composedSearch = e;
              composedModuleSearch.props.value = e;
            }
          },
          scopedSlots: {
            context: () => h(context, {
            props: {
              ...this.tableProps,
              options: {
                ...this.tableProps.options,
                ...this.composedOptions
              },
              search: this.composedSearch,
            },
            on: {
              'update:options': (obj) => {
                this.$set(this.$data, 'composedOptions', obj);
              }
            },
            scopedSlots: this.$scopedSlots
            }
          ),
            ...this.$scopedSlots
          },
        });
      }
    }
  }
}