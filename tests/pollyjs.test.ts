import NodeAdapter from "@pollyjs/adapter-node-http";
import { Polly } from "@pollyjs/core";
import FSPersister from "@pollyjs/persister-fs";
import fetch from "node-fetch";
import { MODES } from "@pollyjs/utils";

/*
  Register the adapters and persisters we want to use. This way all future
  polly instances can access them by name.
*/
Polly.register(NodeAdapter);
Polly.register(FSPersister);

interface PostData {
  id: string;
}

describe("Simple Example", function () {
  it("fetches a post", async function () {
    /*
      Create a new polly instance.

      Connect Polly to fetch. By default, it will record any requests that it
      hasn't yet seen while replaying ones it has already recorded.
    */
    const polly = new Polly("Simple Example", {
      adapters: [NodeAdapter], // Hook into `fetch`
      persister: "fs",
      logLevel: "info", // Log requests to console
      mode: MODES.RECORD,
    });

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const post: PostData = (await response.json()) as PostData;

    expect(response.status).toBe(200);
    expect(post.id).toBe(1);

    /*
      Calling `stop` will persist requests as well as disconnect from any
      connected adapters.
    */
    await polly.stop();
  });
});
