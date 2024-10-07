export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloud = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export interface diaries {
  id: number;
  date: string;
  visibility: Visibility;
  weather: Weather;
  comment?: string;
}

export interface ErrorMessage {
  response: { data: null | string };
}

export type newDiary = Omit<diaries, "id">;
