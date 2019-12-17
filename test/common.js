// @ts-nocheck
const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");
sinon.stub(console, "log");
chai.use(sinonChai);
chai.should();
chai.config.includeStack = true;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
global.sinon = sinon;
