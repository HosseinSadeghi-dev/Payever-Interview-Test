export interface SnackbarModel {
  show: boolean;
  message: string;
  type?: SnackbarType;
}

export enum SnackbarType {
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
  Error = 'error'
}
