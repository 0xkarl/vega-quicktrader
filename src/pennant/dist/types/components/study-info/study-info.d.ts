/// <reference types="react" />
import './study-info.scss';
export declare type StudyInfoProps = {
  title: string;
  info: {
    id: string;
    label: string;
    value: string;
  }[];
};
export declare const StudyInfo: ({
  title,
  info,
}: StudyInfoProps) => JSX.Element;
