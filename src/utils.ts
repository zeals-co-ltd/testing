// Current just an example of where common util code should go
export function getBaseUrl() {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://serverest.dev";
    default:
      throw new Error("Url or env not defined");
  }
}
