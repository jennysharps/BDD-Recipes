var request = require("request");
var base_url = "http://localhost:3000";
var cheerio = require('cheerio');

describe("Recipe List", function() {
    describe("No recipes available", function() {
        describe("When there are no recipes in the system,", function() {
            it("the message \"Sorry, we currently have no recipes for you\" is displayed", function(done) {
                request.get(base_url + '/recipes?stub=0', function(error, response, body) {
                    body = body || '';
                    $ = cheerio.load(body);
                    expect($('#recipes > p').html()).toEqual('Sorry, we currently have no recipes for you');
                    done();
                });
            });
        });
    });

    describe("One recipe available", function() {
        describe("When \"Sapphire's stir-fry\" exists in the system,", function() {
            var $;

            it("the recipe \"Sapphire's stir-fry\" is displayed", function(done) {
                request.get(base_url + '/recipes?stub=1', function(error, response, body) {
                    body = body || '';
                    $ = cheerio.load(body, {decodeEntities: false});
                    expect($('.recipe-title').html()).toEqual("Sapphire's stir-fry");
                    done();
                });
            });

            it("the cooking time of \"30 minutes\" is displayed", function(done) {
                expect($('.cooking-time').html()).toEqual("30 minutes");
                done();
            });

            it("the image \"sachas_stir-fry_17077_16x9.jpg\" is displayed", function(done) {
                var imgHref = $('.recipe-list-item img').attr('src');
                    filename = imgHref.substring(imgHref.lastIndexOf('/')+1);

                expect(filename).toEqual("sachas_stir-fry_17077_16x9.jpg");
                done();
            });
        });
    });    
});