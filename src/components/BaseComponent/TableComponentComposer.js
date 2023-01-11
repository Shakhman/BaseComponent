import searchInitProps from './modules/initialProps/searchProps';
import Vue from 'vue';

const getMultiBindModuleSearch = () => ({ on: {}, props: {}})

export default class TableComponentComposer {
  constructor(BaseComponent, ContextComponent) {
    this.context = ContextComponent;
    this.BaseComponent = BaseComponent;
    this.composedOptions = Vue.observable({});
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
      computed: {
        multiBindModuleSearch() {
          return {
            props: {
              ...searchInitProps(),
              ...this.moduleSearch.props,
            },
            on: {
              ...this.moduleSearch.on,
            }
          }
        }
      },
      render(h) {
        const multiBindModuleSearch = getMultiBindModuleSearch();

        multiBindModuleSearch.on = this.moduleSearch.on,
        multiBindModuleSearch.props = { ...searchInitProps(), ...this.moduleSearch.props }
        this.composedSearch = multiBindModuleSearch.props.value; 

        return h(BaseComponent, {
          props: {
            ...this.headerProps,
            ...this.$props,
            moduleSearch: this.multiBindModuleSearch
          },
          on: {
            ...this.$listeners,
            'bc::search:input': (e) => {
              this.composedSearch = e;
              multiBindModuleSearch.props.value = e;
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