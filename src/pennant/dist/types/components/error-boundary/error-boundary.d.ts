import * as React from 'react';
interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}
export declare class ErrorBoundary extends React.Component<Props, State> {
  state: State;
  constructor(props: Props);
  static getDerivedStateFromError(_: Error): State;
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
  render(): React.ReactNode;
}
export {};
