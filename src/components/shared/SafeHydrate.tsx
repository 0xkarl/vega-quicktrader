import { FC, ReactNode } from 'react';

const SafeHydrate: FC<ReactNode> = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
};

export default SafeHydrate;
