export interface UserI {
  _id: string;
  username: string;
}

export type IImage = {
  _id: string;
  url: string;
  userId: string;
};

export interface TransformImageType {
  resize?: {
    width: number;
    height: number;
  };
  crop?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  rotate?: number;
  format?: string;
  filters?: {
    grayscale?: boolean;
    sepia?: boolean;
  };
}