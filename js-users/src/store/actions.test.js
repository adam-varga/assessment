import { createAction } from "./actions";

describe("createAction", () => {
  it("produces expected action object", () => {
    const action = createAction("A", { test: true });

    expect(action).toStrictEqual({
      type: "A",
      payload: {
        test: true,
      },
    });
  });
});
