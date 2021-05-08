import { ScaleLinear, ScaleTime } from '../../types';
import { ZoomTransform } from 'd3-zoom';
import { PlotArea } from '../plot-area';
export declare function recalculateScale(
  xTransform: () => ZoomTransform,
  xScale: ScaleTime,
  yScales: Record<string, ScaleLinear>,
  id: string,
  plotAreas: {
    [id: string]: PlotArea;
  },
  yElements: any,
  yZooms: any,
  yTransforms: any
): void;
