export const decodedJWT = (token: string) => {
  let decodedJWT = {};

  try {
    decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return decodedJWT;
  }

  return decodedJWT;
};
