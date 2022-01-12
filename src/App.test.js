import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("<App/>", () => {
  beforeEach(cleanup);
  it("should render  <App/> without any error and pagination buttons", () => {
    render(<App />);
    expect(screen.getByText("Friends List")).toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).toBeNull();
  });

  it("should render the input field to enter friends name", () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    expect(input).toBeInTheDocument();
  });

  it("should add new friend to the list and clear the input", () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    userEvent.type(input, "John Doe");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const item = screen.getByText("John Doe");
    expect(item).toBeInTheDocument();
    expect(input.nodeValue).toBe(null);
  });

  it("should render the error while entering invalid name", () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    userEvent.type(input, "Raj");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const errMsg = screen.getByTestId("error-msg");
    expect(errMsg).toBeInTheDocument();
  });

  it("should be marked as favorite", async () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    userEvent.type(input, "John Doe");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const item = screen.getByText("John Doe");
    expect(item).toBeInTheDocument();

    const favIcon = screen.getByTestId("fav-icon");
    userEvent.click(favIcon);
    expect(favIcon.querySelector("i").classList.contains("fas")).toBeTruthy();
  });

  it("should open a confirmation modal", async () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    userEvent.type(input, "John Doe");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const item = screen.getByText("John Doe");
    expect(item).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("delete-icon");
    userEvent.click(deleteIcon);
    const warning = await screen.findByTestId("confirm-modal");
    expect(warning).toBeInTheDocument();
  });

  it("should delete the friends from the list", async () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    userEvent.type(input, "John Doe");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const item = screen.getByText("John Doe");
    expect(item).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("delete-icon");
    userEvent.click(deleteIcon);
    const confirmBtn = await screen.findByTestId("confirm-btn");
    userEvent.click(confirmBtn);
    expect(confirmBtn).not.toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
  it("should not delete the friends from the list", async () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    userEvent.type(input, "John Doe");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const item = screen.getByText("John Doe");
    expect(item).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("delete-icon");
    userEvent.click(deleteIcon);
    const cancelBtn = await screen.findByTestId("cancel-btn");
    userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should render the pagination buttons only when there are more than 4 persons", async () => {
    render(<App />);
    const input = screen.getByTestId("input-name");
    const users = [
      "person A",
      "person B",
      "person C",
      "person D",
      "person E",
      "person F",
    ];

    for (let person of users) {
      userEvent.type(input, person);
      fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    }
    const pagination = await screen.findByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });

  it("should render the pagination buttons and expected list on click on them", async () => {
    localStorage.clear();
    render(<App />);
    const input = screen.getByTestId("input-name");
    const users = [
      "personAA",
      "personBB",
      "personCC",
      "personDD",
      "personEE",
      "personFF",
    ];

    for (let person of users) {
      userEvent.type(input, person);
      fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    }
    const prevBtn = await screen.findByTestId("prev-btn");
    const nextBtn = await screen.findByTestId("next-btn");
    expect(screen.getAllByTestId(/person*/).length).toBe(4);
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
    fireEvent.click(nextBtn);
    expect(screen.queryByText(/personDD/)).not.toBeInTheDocument();
    expect(screen.getByText(/personFF/)).toBeInTheDocument();

    // // click on prev
    fireEvent.click(prevBtn);
    expect(await screen.findByText(/personDD/)).toBeInTheDocument();
  });
  it("should sort the list by fav", async () => {
    localStorage.clear();
    render(<App />);
    const input = screen.getByTestId("input-name");
    const users = ["personA", "personB", "personC", "personFav"];

    for (let person of users) {
      userEvent.type(input, person);
      fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    }

    const personD = screen.getByTestId("person-4");
    const favIcon = within(personD).getByTestId("fav-icon");
    userEvent.click(favIcon);

    // find sortby icon
    const sortByIcon = screen.getByTestId("sortBy-fav-icon");

    userEvent.click(sortByIcon);
    expect(
      sortByIcon.querySelector("i").classList.contains("fas")
    ).toBeTruthy();
    const listWrapper = screen.getByTestId("list-wrapper");
    const firstPerson = within(listWrapper).getAllByTestId(/person-\d/)[0];
    expect(firstPerson.textContent.startsWith("personFav")).toBeTruthy();
  });
});
