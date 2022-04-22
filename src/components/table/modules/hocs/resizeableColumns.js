export default function withResizableColumns(WrappedComponent) {
  return {
    props: {
      ...WrappedComponent.props,
      resizableColumns: {
        default: () => ([]),
        type: Array,
      },
    },
    render(h) {
      return h(WrappedComponent, {
        props: this.$props,
        on: this.$listeners,
        attrs: this.$attrs,
        scopedSlots: this.$scopedSlots,
      });
    },
  };
}
