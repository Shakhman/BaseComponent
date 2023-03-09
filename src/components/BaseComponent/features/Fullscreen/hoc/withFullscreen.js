import Fullscreen from '../Fullscreen.vue';
import { VDialog } from 'vuetify/lib';

export function withFullscreen(WrappedComponent) {
  return {
    name: 'WithFullscreen',
    props: WrappedComponent.props,
    data: () => ({
      isFullscreen: false,
    }),
    render(h) {
      const namedSlotContent = h(Fullscreen, {
        slot: 'fullscreen', props: { value: this.isFullscreen }, on: {
          click: () => {
            this.isFullscreen = !this.isFullscreen;

            this.$emit('clicked:fullscreen', this.isFullscreen)
          }
        }
      });
    
      const nodes = [h(WrappedComponent, {
          props: this.$props,
          on: this.$listeners,
          attrs: this.$attrs,
          scopedSlots: this.$scopedSlots,
        }, [namedSlotContent])
      ];

      if (this.isFullscreen) {
        nodes.push(h(VDialog, {
          props: {
            value: this.isFullscreen,
          },
          scopedSlots: {
            default: () => nodes[0]
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
