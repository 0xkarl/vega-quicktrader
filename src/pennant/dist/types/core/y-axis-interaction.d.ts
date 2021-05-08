import { Selection } from 'd3-selection';
/**
 * The y-axis interaction component handles dragging interactions.
 */
export declare class YAxisInteraction {
  private drag;
  private listeners;
  draw(selection: Selection<Element, any, any, any>): void;
  on(typenames: string, callback: (this: object, ...args: any[]) => void): this;
}
