import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import * as topicController from "../routes/controllers/topicController.js";
import * as topicServiceModule from "../services/topicService.js";



// .........................................Unit test for getTopicData function

// Store the original getTopicData function
//const originalGetTopicData = topicController.getTopicData;

//Mock request object
let formData = new FormData();
formData.append("name", "Topic Name");

// mock user object
const mockAdminUser = {
    id: 1,
    admin: true,
};

const mockRequest = {
  body: async () => ({
    value: formData,
  }),
};

Deno.test("getTopicData should parse form data from the request", async () => {
  // Call the function with the mock request
  const result = await topicController.getTopicData(mockRequest);

  // Assert the expected result
  assertEquals(result, {
    name: "Topic Name",
    validationErrors: {},
  });
});


const formData1 = new FormData();
formData1.append("name", "Topic Name 1");
const mockRequest1 = {
    body: async () => ({
      value: formData1,
    }),
  };
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest1);
    // Assert the expected result
    assertEquals(result, {
      name: "Topic Name 1",
      validationErrors: {},
    });
  });


const formData2 = new FormData();
formData2.append("name", "Topic Name 2");
const mockRequest2 = {
    body: async () => ({
    value: formData2,
    }),
};
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest2);
    // Assert the expected result
    assertEquals(result, {
    name: "Topic Name 2",
    validationErrors: {},
    });
});

const formData3 = new FormData();
formData3.append("name", "Topic Name 3");
const mockRequest3 = {
    body: async () => ({
      value: formData3,
    }),
  };
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest3);
    // Assert the expected result
    assertEquals(result, {
      name: "Topic Name 3",
      validationErrors: {},
    });
  });


const formData4 = new FormData();
formData4.append("name", "Topic Name 4");
const mockRequest4 = {
    body: async () => ({
    value: formData4,
    }),
};
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest4);
    // Assert the expected result
    assertEquals(result, {
    name: "Topic Name 4",
    validationErrors: {},
    });
});

const formData5 = new FormData();
formData5.append("name", "Topic Name 5");
const mockRequest5 = {
    body: async () => ({
    value: formData5,
    }),
};
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest5);
    // Assert the expected result
    assertEquals(result, {
    name: "Topic Name 5",
    validationErrors: {},
    });
});


const formData6 = new FormData();
formData6.append("name", "Topic Name 6");
const mockRequest6 = {
    body: async () => ({
    value: formData6,
    }),
};
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest6);
    // Assert the expected result
    assertEquals(result, {
    name: "Topic Name 6",
    validationErrors: {},
    });
});



const formData7 = new FormData();
formData7.append("name", "Topic Name 7");
const mockRequest7 = {
    body: async () => ({
    value: formData7,
    }),
};
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest7);
    // Assert the expected result
    assertEquals(result, {
    name: "Topic Name 7",
    validationErrors: {},
    });
});


const formData8 = new FormData();
formData8.append("name", "Topic Name 8");
const mockRequest8 = {
    body: async () => ({
    value: formData8,
    }),
};
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest8);
    // Assert the expected result
    assertEquals(result, {
    name: "Topic Name 8",
    validationErrors: {},
    });
});


const formData9 = new FormData();
formData9.append("name", "Topic Name 9");
const mockRequest9 = {
    body: async () => ({
    value: formData9,
    }),
};
Deno.test("getTopicData should parse form data from the request", async () => {
    // Call the function with the mock request
    const result = await topicController.getTopicData(mockRequest9);
    // Assert the expected result
    assertEquals(result, {
    name: "Topic Name 9",
    validationErrors: {},
    });
});


// ......................................... addTopic


// Deno.test("buzz adTopic from topicController", async () => {
//     // Override the wrapper function with the mock during the test
//     topicController.overrideGetTopicData = async (request) => {
//         return {
//             name: "Mock Topic",
//             validationErrors: {},
//         };
//     };

//     await topicController.addTopic({
//         request: mockRequest,
//         user: mockAdminUser,
//     });

//     const data = topicController.validationData;
//     console.log(data);

//     assertEquals(data.name, "Mock Topic");

//     // Restore the original wrapper function after the test
//     topicController.overrideGetTopicData = originalGetTopicData;
// });








