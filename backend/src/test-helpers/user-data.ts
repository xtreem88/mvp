import { faker } from '@faker-js/faker';

export function createRandomUser(role:  "buyer" | "seller" | "admin") {
  const pass = faker.internet.password();
  return {
    name: faker.internet.userName(),
    username: faker.internet.userName(),
    password: pass,
    confirmPassword: pass,
    role,
  };
}
