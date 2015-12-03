var request = require("request");
var base_url = "http://localhost:3000"

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        response = response || {};

        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url + '?number=3', function(error, response, body) {
        body = body || false;

        expect(body).toBe(JSON.stringify(["Hello World", "Hello World", "Hello World"]));
        done();
      });
    });
  });
});