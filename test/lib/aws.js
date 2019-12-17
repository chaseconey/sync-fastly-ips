const aws = require("../../lib/aws");
const fixture = require("../fixtures/aws");

describe("Aws", function() {
  describe("#getIpsFromSg()", function() {
    it("should parse flat list from aws response", function() {
      let ips = aws.getIpsFromSg(fixture.securityGroup);

      // This comes from the fixture
      let expected = ["0.0.0.0/0"];

      assert.deepEqual(ips, expected);
    });

    it("should return empty array when no IPs defined", function() {
      let ips = aws.getIpsFromSg(fixture.securityGroupEmptyRanges);

      // This comes from the fixture
      let expected = [];

      assert.deepEqual(ips, expected);
    });
  });
});
