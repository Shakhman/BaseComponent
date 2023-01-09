import Search from '../Search.vue';

export default function withSearch(WrappedComponent) {
  return {
    name: 'withSearch',
    props: {
      ...WrappedComponent.props,
      moduleSearch: {
        type: Object,
      }
    },
    render(h) {
      const namedSlotContent = h(Search, {
        slot: 'search',
        props: {
          moduleSearchProps: this.moduleSearch.props
        },
        on: {
          input: async (e) => {
            this.$emit('bc::search:input', e);

            if (this.$props.moduleSearch?.on?.onInput) {
              this.$props.moduleSearch.on.onInput(e);
            }
          }
        },
      });
      
      return h(WrappedComponent, {
        props: this.$props,
        on: this.$listeners,
        attrs: this.$attrs,
        scopedSlots: this.$scopedSlots,
      }, [namedSlotContent]);
    },
  };
}
