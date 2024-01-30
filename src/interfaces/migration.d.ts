export interface Jobs {
  id: number;
  job: string;
}

export interface Deparments {
  id: number;
  deparment: string;
}

export interface Employees {
  id: number;
  name: string;
  datetime: Date;
  deparment_id: number;
  job: number;
}
