export class User {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
  profilePicture: string = "assets/images/users/profile.jpg";
  following: [] = [];
  _id?: string;
}
