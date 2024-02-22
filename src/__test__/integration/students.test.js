// supertest
const supertest = require("supertest");
const app = require("../../app");
const Student = require("../../models/student.model");
const mongoose = require("mongoose");
const { generateAuthToken } = require("../../utils/jwt");

const request = supertest(app);

// fetch, axios
// fetch('/')
// axios.get('/')
// request.get('')

const token = generateAuthToken({ username: "admin", role: "admin" });

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("/v1/students", () => {
  // describe('GET /', ()=>{})
  describe("POST /", () => {
    beforeEach(async () => {
      await Student.deleteMany({}); //when do post test suit, make sure each test have clean db
      // await Student.insertMany({}), add for each test in get test suit
    });
    it("should save the student to DB if request is valid", async () => {
      // POST /v1/students + student payload + (token)
      const payload = {
        firstName: "john",
        lastName: "Doe",
        email: "email@email.com",
      };

      const res = await request
        .post("/v1/students")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);
      console.log(res.statusCode);
      expect(res.statusCode).toBe(201);
      const student = await Student.findOne(payload).exec();
      // student will 'null' if not found
      expect(student).not.toBeNull();
    });

    it.each`
      property       | value
      ${"firstName"} | ${undefined}
      ${"lastName"}  | ${undefined}
      ${"email"}     | ${"a"}
      ${"email"}     | ${"a.com"}
      ${"email"}     | ${"a@@a.com"}
    `(
      "should return 400 if $property is $value",
      async ({ property, value }) => {
        const invalidStudent = {
          firstName: "john",
          lastName: "Doe",
          email: "email@email.com",
          [property]: value,
        };

        const res = await request
          .post("/v1/students")
          .set("Authorization", `Bearer ${token}`)
          .send(invalidStudent);

        expect(res.statusCode).toBe(400);
        const student = await Student.findOne(invalidStudent).exec();
        expect(student).toBeNull();
      }
    );
  });
});
