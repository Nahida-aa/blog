// import { createSubApp } from "../app/create";
// import { createRoute, z } from "@hono/zod-openapi";
// import { db } from ".";

// import {
//   insertProjectMember,
//   communityInsertSchema,
//   communitySelectSchema,
//   insertCommunity,
//   projectInsertZ,
//   insertVersion,
//   versionInsertSchema,
//   communityMemberInsertSchema,
//   communityMemberSelectSchema,
//   insertCommunityMember,
// } from "./service";
// import {
//   jsonContentRequest,
//   reqRes201,
//   res201,
// } from "../openapi/helpers/json-content";
// import { adminAuthMiddleware } from "../auth/middleware";
// import { community } from "./schema";

// const app = createSubApp(adminAuthMiddleware)
//   .openapi(
//     createRoute({
//       tags: ["db"],
//       method: "post",
//       path: "/project/version",
//       ...reqRes201(versionInsertSchema, z.array(versionInsertSchema)),
//     }),
//     async (c) => {
//       return c.json(await insertVersion(db, c.req.valid("json")), 201);
//     },
//   )
//   // .openapi(createRoute({
//   //   tags: ["db"],
//   //   method: "post",
//   //   path: "/project/member",
//   //   ...reqRes201(
//   //     projectMemberInsertSchema,
//   //     z.array(projectMemberSelectSchema),
//   //   ),
//   // }), async (c) => {
//   //   return c.json(await insertProjectMember(db, c.req.valid("json")), 201);
//   // })
//   .openapi(
//     createRoute({
//       tags: ["db"],
//       method: "post",
//       path: "/community",
//       request: jsonContentRequest(communityInsertSchema, "insert data"),
//       responses: res201(communitySelectSchema),
//     }),
//     async (c) => {
//       const [ret] = await insertCommunity(db, c.req.valid("json"));
//       return c.json(ret, 201);
//     },
//   )
//   .openapi(
//     createRoute({
//       tags: ["db"],
//       method: "post",
//       path: "/community/member",
//       request: jsonContentRequest(communityMemberInsertSchema, "insert data"),
//       responses: res201(communityMemberSelectSchema),
//     }),
//     async (c) => {
//       const [ret] = await insertCommunityMember(db, c.req.valid("json"));
//       return c.json(ret, 201);
//     },
//   );

// export default app;
