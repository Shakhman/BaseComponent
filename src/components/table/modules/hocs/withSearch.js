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
    data: () => ({
      _value: '',
    }),
    render(h) {
      this._value = this.$props.moduleSearch?.props?.value || '';

      const componentProps = {
        ...this.$props.moduleSearch?.props,
        value: this._value,
      }

      // this.$emit('search', this._value);

      const namedSlotContent = h(Search, {
        slot: 'search', props: componentProps, on: {
          input: (e) => {
            this._value = e;
            this.$emit('search', this._value);

            if (this.$props.moduleSearch?.on?.search) {
              this.$props.moduleSearch.on.search(e);
            }
          }
        }
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
