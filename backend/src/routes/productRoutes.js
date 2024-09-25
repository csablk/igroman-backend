import { Router } from "express";
import { checkAdminRole } from "../middlewares/check-admin.middleware.js";
import { getAllProducts } from "../controllers/product/get-all.controller.js";
import { deleteProduct } from "../controllers/product/delete-product.controller.js";
import { createProductValidation } from "../validations/create-product.validation.js";
import { uploadImage } from "../config/multer.config.js";
import { createProduct } from "../controllers/product/create-product.controller.js";
import { getOneProduct } from "../controllers/product/get-one-product.controller.js";

const productRouter = Router();

productRouter.post(
  "/",
  checkAdminRole,
  uploadImage,
  createProductValidation,
  createProduct,
);
productRouter.get("/:id", getOneProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:id", checkAdminRole, deleteProduct);

export default productRouter;
