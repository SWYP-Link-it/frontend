declare module 'react-window' {
  import { ComponentType, CSSProperties } from 'react';

  export interface ListChildComponentProps<T = any> {
    index: number;
    style: CSSProperties;
    data: T;
    isScrolling?: boolean;
  }

  export interface ListProps<T = any> {
    height: number | string;
    itemCount: number;
    itemSize: number | ((index: number) => number);
    width: number | string;
    children: ComponentType<ListChildComponentProps<T>>;
    itemData?: T;
    onItemsRendered?: (props: {
      overscanStartIndex: number;
      overscanStopIndex: number;
      visibleStartIndex: number;
      visibleStopIndex: number;
    }) => void;
    overscanCount?: number;
    style?: CSSProperties;
    className?: string;
    useIsScrolling?: boolean;
  }

  export class FixedSizeList<T = any> extends React.Component<ListProps<T>> {}
  export class VariableSizeList<T = any> extends React.Component<
    ListProps<T>
  > {}
}
