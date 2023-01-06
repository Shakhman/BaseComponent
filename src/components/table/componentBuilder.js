import ComponentWrapper from '../ComponentWrapper.vue';
import withSearch from './modules/hocs/withSearch';
import withFullscreen from './modules/hocs/withFullscreen';

const ViewOptions = {
  table: {
    init() {
      return {
        props: {
          ...this.tableProps,
          ...this.tablePropsProxy
        }, on: {
          'update:options': (obj) => {
            this.$set(this.tablePropsProxy, 'options', obj);
          }
        },
        scopedSlots: this.$scopedSlots,
      }
    }
  },
  chart: {
    init() {
      return {}
    }
  }
}

export default class ComponentBuilder {
  constructor() {
    this.view = {};
    this.Component = ComponentWrapper;

    this.componentHocList = [];
    this.viewHocList = [];
  }

  async withView(view) {
    const module = await import('./BaseTable.vue');

    this.view = {
      view: view,
      component: module.default,
    };

    return this;
  }

  // withResizableColumns() {
  //   import('./modules/hocs/resizeableColumns').then((m) => {
  //     this.view.component = m.default(this.view.component);
  //   })

  //   return this;
  // }

  withSearch() {
    this.componentHocList = [...this.componentHocList, withSearch ];

    return this;
  }

  withFullscreen() {
    this.componentHocList = [...this.componentHocList, withFullscreen ];

    return this;
  }

  build() {
    const view = this.view;
    const self = this;


    this.componentHocList.forEach((hoc) => {
      this.Component = hoc(self.Component);
    });

    return {
      name: 'ComponentBuilder',
      props: {
        headerProps: {
          type: Object,
        },
        tableProps: {
          type: Object,
        },
        moduleSearch: {
          type: Object,
        },
      },
      data() {
        return {
          tablePropsProxy: {
            search: ''
          },
        }
      },
      render(h) {        
        return h(self.Component, {
          props: {
            ...this.headerProps,
            ...this.$props,
          },
          on: {
            ...this.$listeners, search: (e) => {
              this.tablePropsProxy.search = e;
          } },
          scopedSlots: {
            default: () => h(view.component, ViewOptions[view.view].init.call(this)),
            ...this.$scopedSlots
          },
        });
      }
    }
  }
}