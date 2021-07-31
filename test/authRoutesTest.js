let server = require("../app.js");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Test of Auth Routes'", async () => {
  describe("Test of '/api/user/login'", () => {
    it("Login Test with wrong password", (done) => {
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "mohamedashraf246950@gmail.com",
          password: "12345sdsdsdsas6",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.equal("Failing to login");
          done();
        });
    });

    it("Login Test with wrong user", (done) => {
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "adsdasdsadasdasdsadasdgdasad@gmail.com",
          password: "123456",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.equal("Email is not exists");
          done();
        });
    });
    it("Login Test with right user and password", (done) => {
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "mohamedashraf246950@gmail.com",
          password: "123456",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.equal("Succuss login ");
          done();
        });
    });
  });

  describe("Test of '/api/user/register'", () => {
    it("Registing with existed data", (done) => {
      chai
        .request(server)
        .post("/api/user/register")
        .send({
          name: "Ashraf",
          email: "mohamedashraf246950@gmail.com",
          password: "abcdefghij",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.message.should.equal("Email is already exists");
          done();
        });
    });

    it("Registered with wrong password (less than 6 characters) format", (done) => {
      chai
        .request(server)
        .post("/api/user/register")
        .send({
          name: "Ibrahim",
          email: "mohamedashraf2469sdsd50@gmail.com",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it("Registing with wrong email", (done) => {
      chai
        .request(server)
        .post("/api/user/register")
        .send({
          name: "Ibrahim",
          email: "mohamedashraf246950",
          password: "123456",
        })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  describe("Test of '/api/user/logout'", () => {
    it("Logout", (done) => {
      chai
        .request(server)
        .post("/api/user/logout")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.equal(
            "Cookie is destroyed! You are logout Successfully"
          );
          done();
        });
    });
  });
});
