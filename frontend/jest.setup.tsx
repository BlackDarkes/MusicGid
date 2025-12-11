/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";

jest.mock("/public/favicon.svg", () => ({
  __esModule: true,
  default: (props: any) => {
    return <svg data-testid="logo-mock" {...props} />;
  },
}));
