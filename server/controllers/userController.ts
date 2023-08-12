import { Strapi } from "@strapi/strapi";
import { Context, DefaultContext } from "koa";
declare const strapi: Strapi;

const STRAPI_DESTINATION = "strapi";
const FIREBASE_DESTINATION = "firebase";

export default {
  list: async (ctx: DefaultContext | Context) => {
    let { pagination, nextPageToken } = ctx.query;

    if (!pagination) {
      pagination = {};
      pagination.page = 1;
      pagination.pageSize = 10;
    }

    ctx.body = await strapi
      .plugin("firebase-auth")
      .service("userService")
      .list(pagination, nextPageToken);
  },

  create: async (ctx) => {
    const { destination } = ctx.params;
    switch (destination) {
      case STRAPI_DESTINATION:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .createStrapiUser(ctx.request.body);
        break;
      case FIREBASE_DESTINATION:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .createFirebaseUser(ctx.request.body);
        break;
      default:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .create(ctx.request.body);
        break;
    }
  },

  get: async (ctx) => {
    ctx.body = await strapi
      .plugin("firebase-auth")
      .service("userService")
      .get(ctx.params.id);
  },

  update: async (ctx) => {
    const { destination } = ctx.params;
    switch (destination) {
      case STRAPI_DESTINATION:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .updateStrapiUser(ctx.params.id, ctx.request.body);
        break;
      case FIREBASE_DESTINATION:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .updateFirebaseUser(ctx.params.id, ctx.request.body);
        break;
      default:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .update(ctx.params.id, ctx.request.body);
        break;
    }
  },

  delete: async (ctx: DefaultContext | Context) => {
    const { destination } = ctx.params;
    switch (destination) {
      case STRAPI_DESTINATION:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .deleteStrapiUser(ctx.params.id);
        break;
      case FIREBASE_DESTINATION:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .deleteFirebaseUser(ctx.params.id);
        break;
      default:
        ctx.body = await strapi
          .plugin("firebase-auth")
          .service("userService")
          .delete(ctx.params.id);
        break;
    }
  },

  deleteMany: async (ctx) => {
    ctx.body = await strapi
      .plugin("firebase-auth")
      .service("userService")
      .deleteMany(ctx.query.ids);
  },
};
