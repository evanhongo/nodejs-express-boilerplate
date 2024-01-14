import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const router = express.Router();
const swaggerSpec = swaggerJsdoc({
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0"
    }
  },
  apis: ["./src/api/route/**/*.ts"]
});

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
