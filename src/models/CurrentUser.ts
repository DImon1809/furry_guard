import type { Pet } from "./Pet";

export type PetOfUser = Omit<Pet, "dateOfBirth"> & {
  id: number;
  recommendations: string;
  ownerId: string;
  breedId: {
    id: 0;
    name: string;
    size: string;
    avgActivity: string;
    pets: string[];
  };
};

export type CurrentUser = {
  id: number;
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth: string;
  pets: PetOfUser[];
};
