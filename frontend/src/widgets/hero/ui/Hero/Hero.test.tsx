import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

test("render hero", () => {
  render(<Hero />);
  expect(screen.getByText("Популярные товары:")).toBeInTheDocument();
});
