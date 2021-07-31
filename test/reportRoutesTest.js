let server = require("../app.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
const authCont = require("../middleware/authCont");

chai.should();
chai.use(chaiHttp);

let token = "Authorization=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWRhc2hyYWYyNDY5NTBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkMDYyWm5vN0VYMlY0M0ZhVEFWVWp0T1Ywc3htejdDUi5vUGlRekMzYlFGU0JmR25SaS45LksiLCJpYXQiOjE2Mjc3MDE0OTZ9.yW3uqOKMPqDjFsVKwDbUmnEH0gfvbyfMqJHfL-3BzsY" ;


describe("Test of Report Route",() => {

  describe("Test of /api/report/read/all ",() => {


it("read all reports with authentication", (done) => {
    chai
      .request(server)
      .get("/api/report/read/all")
      .set('Cookie', token
      )
      .end((err, response) => {
        
        response.should.have.status(200);
        response.body.should.be.an('array');
        done();
      });
  });


  it("read all reports without authentication", (done) => {
    chai
      .request(server)
      .get("/api/report/read/all")
      .set('Cookie', 'Wrong'
      )
      .end((err, response) => {
        
        response.should.have.status(401);
        done();
      });
  });




  })


  describe("Test of /api/report/name/:report_name ",() => {

  
    it("read a existed report with authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/report/name/test_1")
        .set('Cookie', token
        )
        .end((err, response) => {
          
          response.should.have.status(200);
          done();
        });
    });



    it("read a non existed report with authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/report/name/tesdsa")
        .set('Cookie', token
        )
        .end((err, response) => {
          
          response.should.have.status(200);
          done();
        });
    });



    it("read a existed report without authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/report/name/test_1")
        .set('Cookie', "token"
        )
        .end((err, response) => {
          
          response.should.have.status(401);
          done();
        });
    });


    it("read a non existed report without authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/report/name/sdsdsd")
        .set('Cookie', "token"
        )
        .end((err, response) => {
          
          response.should.have.status(401);
          done();
        });
    });

  })


  


  describe("Test of /api/report/read/tag/:tag_name ",() => {

  
    it("read a existed tag with authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/tag/tag_1")
        .set('Cookie', token
        )
        .end((err, response) => {
          
          response.should.have.status(200);
          done();
        });
    });



    it("read a non existed tag with authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/tag/saddsas")
        .set('Cookie', token
        )
        .end((err, response) => {
          
          response.should.have.status(200);
          done();
        });
    });



    it("read a existed tag without authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/tag/tag_1")
        .set('Cookie', "token"
        )
        .end((err, response) => {
          
          response.should.have.status(401);
          done();
        });
    });


    it("read a non existed tag without authentication", (done) => {
      chai
        .request(server)
        .get("/api/report/read/tag/saddad")
        .set('Cookie', "token"
        )
        .end((err, response) => {
          
          response.should.have.status(401);
          done();
        });
    });

  })


  











})


