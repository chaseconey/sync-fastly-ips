const helpers = require("../../lib/helpers");

describe("Helpers", function() {
  describe("#toAdd()", function() {
    it("should return new ips if not currently in sg list", function() {
      let current = ["0.0.0.0/0"];
      let latest = ["0.0.0.0/0", "4.4.4.4/32"];

      let expected = ["4.4.4.4/32"];

      let diff = helpers.toAdd(current, latest);

      assert.deepEqual(diff, expected);
    });

    it("should only return ips to add", function() {
      let current = ["0.0.0.0/0", "4.4.4.4/32"];
      let latest = ["0.0.0.0/0"];

      let expected = [];

      let diff = helpers.toAdd(current, latest);

      assert.deepEqual(diff, expected);
    });
  });

  describe("#toRemove()", function() {
    it("should return ips to remove if in old but not in new", function() {
      let current = ["0.0.0.0/0", "4.4.4.4/32"];
      let latest = ["0.0.0.0/0"];

      let expected = ["4.4.4.4/32"];

      let diff = helpers.toRemove(current, latest);

      assert.deepEqual(diff, expected);
    });

    it("should only return ips to remove", function() {
      let current = ["0.0.0.0/0"];
      let latest = ["0.0.0.0/0", "4.4.4.4/32"];

      let expected = [];

      let diff = helpers.toRemove(current, latest);

      assert.deepEqual(diff, expected);
    });
  });
});
