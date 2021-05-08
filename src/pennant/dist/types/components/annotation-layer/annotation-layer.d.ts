/// <reference types="react" />
import './annotation-layer.scss';
import { Annotation } from '../../types';
export declare type AnnotationLayerProps = {
  annotations: Annotation[];
};
export declare const AnnotationLayer: ({
  annotations,
}: AnnotationLayerProps) => JSX.Element;
