import { Mark } from "./Marks.interfaces";

export interface Model {
  modelId: number;
  name: string;
  mark: Mark;
}

export interface ModelPayload {
  name: string;
  markId: number;
}

export interface ModelUpdatePayload {
  modelId: number;
  name: string;
  markId: number;
}
