import { Selection } from 'd3-selection';
/**
 * The x-axis interaction component handles dragging interactions.
 */
export declare class XAxisInteraction {
  private drag;
  private listeners;
  draw(selection: Selection<Element, any, any, any>): void;
  on(typenames: string, callback: (this: object, ...args: any[]) => void): this;
}
