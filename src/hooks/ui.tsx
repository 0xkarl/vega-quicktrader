import { FC, useState, useContext, createContext, ReactNode } from 'react';

const UIContext = createContext<{
  isShowingChartView: boolean;
  toggleIsShowingChartView: () => void;
} | null>(null);

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isShowingChartView, setIsShowingChartView] = useState(false);

  const toggleIsShowingChartView = () => {
    setIsShowingChartView((isShowingChartView) => !isShowingChartView);
  };

  return (
    <UIContext.Provider
      value={{
        isShowingChartView,
        toggleIsShowingChartView,
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
  const { isShowingChartView, toggleIsShowingChartView } = context;

  return {
    isShowingChartView,
    toggleIsShowingChartView,
  };
}
