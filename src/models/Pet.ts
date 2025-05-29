export enum WalkingStatusDto {
  WANT_HOME = "WANT_HOME",
  WANT_TO_WALK = "WANT_TO_WALK",
}

export enum ActivityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type Pet = {
  id: number;
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
  recommendations: string;
  petWalkingStatus: WalkingStatusDto;
  walks: string[];
  files: {
    content: string;
    createDate: string;
    fileName: string;
    fileType: string;
    id: number;
  }[];
};

export type PetDetails = Pet & {
  recommendations: string;
};
