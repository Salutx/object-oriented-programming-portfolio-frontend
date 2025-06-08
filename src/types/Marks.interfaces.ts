export interface Mark {
  markId: number;
  name: string;
}

export interface MarkPayload {
  name: string;
}

export interface MarkUpdatePayload {
  markId: number;
  name: string;
}
