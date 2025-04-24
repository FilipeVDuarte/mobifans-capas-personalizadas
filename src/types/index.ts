
export interface CustomDeviceRequest {
  deviceModel: string;
  email?: string;
  notifyWhenAvailable: boolean;
}

export type DesignType = 'image' | 'solid';

export interface SavedDesign {
  id: string;
  phoneModel: string;
  imageUrl?: string;
  backgroundColor?: string;
  textContent?: string;
  textFont?: string;
  textColor?: string;
  textSize?: number;
  textPosition?: { x: number, y: number, rotation: number };
  createdAt: Date;
}
