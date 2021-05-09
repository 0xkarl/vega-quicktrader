import { FC, useState, useContext, createContext, ReactNode } from 'react';

const UIContext = createContext<{
  isShowingChartView: boolean;
  toggleIsShowingChartView: () => void;

  notification: string | null;
  notify: (notification: string | null) => void;
  showErrorNotification: (e: any | null) => void;
} | null>(null);

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isShowingChartView, setIsShowingChartView] = useState(false);
  const [notification, notify] = useState<string | null>(null);

  const toggleIsShowingChartView = () => {
    setIsShowingChartView((isShowingChartView) => !isShowingChartView);
  };

  const showErrorNotification = (e: any) => {
    notify(e.message);
  };

  return (
    <UIContext.Provider
      value={{
        isShowingChartView,
        toggleIsShowingChartView,
        notification,
        notify,
        showErrorNotification,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('Missing UI context');
  }
  const {
    isShowingChartView,
    toggleIsShowingChartView,
    notification,
    notify,
    showErrorNotification,
  } = context;

  return {
    isShowingChartView,
    toggleIsShowingChartView,
    notification,
    notify,
    showErrorNotification,
  };
}
