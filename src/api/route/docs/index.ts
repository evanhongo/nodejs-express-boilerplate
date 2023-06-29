import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const router = express.Router();
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0"
    }
  },
  apis: ["./api/route/*.ts"]
});

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
