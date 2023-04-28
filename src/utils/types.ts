export type CreateUserType = {
  username: string;
  password: string;
  email: string;
};

export type UpdateUserType = {
  username: string;
  password: string;
  email: string;
};

export type CreateProfileType = {
  firstname: string;
  lastname: string;
  dob: string;
};

// Movie

export type AddMovieType = {
  name: string;
  description: string;
  thumbnail: Buffer;
};
