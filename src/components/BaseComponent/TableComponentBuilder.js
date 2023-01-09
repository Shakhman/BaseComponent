import ComponentWrapper from '../ComponentWrapper.vue';
import withSearch from './modules/hocs/withSearch';
import ComponentBuilder from './ComponentBuilder';
import withFullscreen from './modules/hocs/withFullscreen';
import TableComponentComposer from './TableComponentComposer';

export default class TableComponentBuilder extends ComponentBuilder {
  constructor() {
    super();
    this.view = {};
    this.Component = ComponentWrapper;

    this.componentHOCList = [];
    this.contextHOCList = [];
  }

  async withContext(view) {
    const module = await import('./BaseTable.vue');

    this.view = {
      view: view,
      component: module.default,
    };

    return this;
  }

  withFullscreen() {
    this.componentHOCList = [...this.componentHOCList, withFullscreen ];

    return this;
  }

  withSearch() {
    this.componentHOCList = [...this.componentHOCList, withSearch ];

    return this;
  }

  build() {
    this.componentHOCList.forEach((hoc) => {
      this.Component = hoc(this.Component);
    });

    return (new TableComponentComposer(this.Component, this.view.component)).getComposedComponent()
  }
}