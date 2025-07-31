import { faker } from "@faker-js/faker";

export interface User {
  _id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    email,
    firstName,
    lastName,
  };
}
