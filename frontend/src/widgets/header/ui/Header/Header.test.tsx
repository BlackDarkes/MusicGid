import { render, screen } from "@testing-library/react"
import { Header } from "./Header"

test("render header", () => {
  render(<Header />);
  expect(screen.getByText("Г. Екатеринбург ул. Академика Шварца д. 14")).toBeInTheDocument();
})