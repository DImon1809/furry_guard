export enum ActivityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type Pet = {
  name: string;
  breed: string;
  gender: "М" | "Ж" | null;
  age: {
    year: number;
    month: number;
    week: number;
  };
  dateOfBirth: string | null;
  weight: number;
  activityLevel: ActivityLevel | null;
};

export type PetDetails = Pet & {
  recommendations: string;
};
