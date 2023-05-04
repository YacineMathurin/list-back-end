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
  title: string;
  description: string;
  thumbnail: string;
};

export type DeleteMovieType = {
  id: string;
  thumbnailPath: string;
};
