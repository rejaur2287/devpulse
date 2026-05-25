import { Router } from "express";
import { issuesController } from "./issues.controller";

import auth from "../../middleware/auth";
import { User_Role } from "../../types";

const router = Router();

router.post(
  "/",
  auth(User_Role.contributor, User_Role.maintainer),
  issuesController.createIssue,
);
router.get(
  "/",
  // auth(User_Role.contributor, User_Role.maintainer),
  issuesController.getAllIssues,
);
router.get("/:id", issuesController.getSingleIssue);
router.patch(
  "/:id",
  auth(User_Role.contributor, User_Role.maintainer),
  issuesController.updateAnIssue,
);
router.delete("/:id", auth(User_Role.maintainer), issuesController.deleteIssue);

export const issuesRoute = router;
