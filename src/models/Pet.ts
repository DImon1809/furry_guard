export enum ActivityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type Pet = {
  name: string;
  breed: string;
  gender: "М" | "Ж";
  age: {
    year: number;
    month: number;
    week: number;
  };
  dateOfBirth: string;
  weight: number;
  activityLevel: ActivityLevel | null;
};
