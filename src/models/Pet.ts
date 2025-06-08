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
  hasRecommendations: boolean;
  vaccinations: {
    common: string | null;
    commonHeader: string | null;
    current: string | null;
    currentHeader: string | null;
    next: string | null;
    nextHeader: string | null;
    previous: string | null;
    previousHeader: string | null;
  };
  walks: string[];
  files: {
    content: string;
    createDate: string;
    fileName: string;
    fileType: string;
    id: number;
  }[];
};

export type PetCard = Omit<Pet, "id"> & { petId: number } & {
  user: {
    id: number;
    firstName: string;
  };
};

export type SendPet = Omit<
  Pet,
  "id" | "files" | "walks" | "petWalkingStatus" | "recommendations" | "hasRecommendations"
>;

export type VaccinationType = {
  fileName: string;
  fileType: string;
  content: string;
  petId: number;
};
