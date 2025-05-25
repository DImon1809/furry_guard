export enum AUTH_TYPES {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export type AuthTypes = keyof typeof AUTH_TYPES;

export type RegisterType = {
  firstName: string;
  surname: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
};

export type RegisterTypeResponse = RegisterType & {
  pets: [
    {
      id: number;
      name: string;
      gender: string;
      weight: number;
      age: number;
      activityLevel: number;
      recommendations: string;
      ownerId: string;
      breedId: {
        id: number;
        name: string;
        size: string;
        avgActivity: string;
        pets: string[];
      };
    },
  ];
};
