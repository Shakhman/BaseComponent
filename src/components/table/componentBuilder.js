import ComponentWrapper from '../ComponentWrapper.vue';
import { VDialog } from 'vuetify/lib';

function getComponents(headerModules) {
  return Object.keys(headerModules).reduce((acc, module) => {
    acc[module] = () => import(`./modules/${module}.vue`);
    return acc;
  }, {});
}

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
    this.headerModules = {};
    this.tableModules = {};
  }

  async withView(view) {
    const module = await import('./BaseTable.vue');

    this.view = {
      view: view,
      component: module.default,
    };

    return this;
  }

  withResizableColumns() {
    import('./modules/hocs/resizeableColumns').then((m) => {
      this.view.component = m.default(this.view.component);
    })

    return this;
  }

  withSearch() {
    this.headerModules.Search = {
      slot: 'search',
      render(h) {
        const externalProps = this.headerProps?.modules?.search || {};
        this.$set(this.tablePropsProxy, 'search', externalProps.value || '');

        return () => h('Search', {
          props: externalProps,
          on: {
            input: (e) => {
              externalProps.value = e;
              this.$emit('search', e);
            }
          },
        }, []);
      },
    };

    return this;
  }

  withFullscreen() {
    this.headerModules.Fullscreen = {
      slot: 'fullscreen',
      render(h) {
        return () => h('Fullscreen', {
          on: {
            click: () => {
              this.isFullscreen = true;
            }
          }
        }, []);
      }
    };

    return this;
  }

  build() {
    const view = this.view;
    const self = this;

    return {
      components: {
        ...getComponents(self.headerModules)
      },
      props: {
        headerProps: {
          type: Object,
        },
        tableProps: {
          type: Object,
        },
      },
      data() {
        return {
          tablePropsProxy: {
            search: ''
          },
          headerPropsProxy: {},
          isFullscreen: false,
        }
      },
      render(h) {
        const headerModules = Object.values(self.headerModules).reduce(((acc, val) => {
          acc[val.slot] = val.render.call(this, h);
          return acc;
        }), {});

        const Component = h(ComponentWrapper, {
          props: {
            ...this.headerProps,
            ...this.headerPropsProxy
          },
          scopedSlots: {
            default: () => h(view.component, ViewOptions[view.view].init.call(this)),
            ...headerModules,
          },
        });
        
        const nodes = [Component];

        if (this.isFullscreen) {
          nodes.push(h(VDialog, {
            props: {
              value: this.isFullscreen,
            },
            scopedSlots: {
              default: () => Component
            },
            on: {
              input: (e) => {
                this.isFullscreen = e;
              }
            }
          }));
        }
         
        return h('div', nodes)
      }
    }
  }
}