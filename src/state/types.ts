export interface RootState {
  loading: boolean;
  error: boolean;
  drawer: boolean;
  toast: string[];
}

export interface Toast {
  message: string;
  color?: 'success' | 'info' | 'error';
}
