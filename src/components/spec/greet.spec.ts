// tslint:disable-next-line:no-reference
///  <reference path="../../../typings/index.d.ts"/>

import * as jasmine from "jasmine";
import { greet } from "../greet";

jasmine.describe("Greet says greeting", () => {
  jasmine.it("and so is a spec", () => {
    const response = greet("nimatra");
    jasmine.expect(response).toBe("Hello from nimatra");
  });
});
