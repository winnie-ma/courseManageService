const authGuard = require("../../middleware/normal/authGuard");
const { validateToken } = require("../../utils/jwt");
jest.mock("../../utils/jwt");
// const validateToken = jest.fn()

describe("authentication guard middleware", () => {
  // lifehook function
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 401 if authorization header is not defined", () => {
    console.log("aa");
    // setup
    // const req = {
    //   header: jest.fn(),
    // };
    // const res = {
    //   status: jest.fn(),
    //   json: jest.fn(),
    // };
    // res.status.mockReturnValue(res);
    // const next = jest.fn();

    // // execute
    // authGuard(req, res, next);

    // // compare
    // expect(res.status).toHaveBeenCalledWith(401);
    // expect(res.json).toHaveBeenCalledWith({
    //   error: "Missing authorization in header",
    // });
  });

  // it("should call next function when token is valid", () => {
  //   const token = "any_token";
  //   const req = {
  //     header: jest.fn(),
  //   };
  //   req.header.mockReturnValue(`Bearer ${token}`);
  //   const res = {
  //     status: jest.fn(),
  //     json: jest.fn(),
  //   };
  //   res.status.mockReturnValue(res);
  //   const next = jest.fn();
  //   validateToken.mockImplementation((token) => {
  //     // if (token xxxxx)
  //     return [
  //       {
  //         _id: "fake_id",
  //       },
  //       undefined,
  //     ];
  //   });

  //   authGuard(req, res, next);

  //   expect(next).toHaveBeenCalled();
  //   expect(validateToken).toHaveBeenCalledWith(token);
  // });
});
