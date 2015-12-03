var request = require("request");
var base_url = "http://localhost:3000"

describe("Recipe List", function() {
  describe("GET /recipes", function() {
    it("returns \"<p><strong>The</strong> Recipe List!</p>\"", function(done) {
      request.get(base_url + '/recipes', function(error, response, body) {
        body = body || false;

        expect(body).toBe("<p><strong>The</strong> Recipe List!</p>");
        done();
      });
    });
  });
});