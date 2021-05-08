import * as React from 'react';
/**
 * Produces an image of the chart.
 *
 * @param chartRef React ref to chart component
 * @returns A promise that will fulfill with a new Blob object represnting a file containing an image.
 */
export declare function asyncSnapshot(
  chartRef: React.RefObject<HTMLElement>
): Promise<Blob | null>;
