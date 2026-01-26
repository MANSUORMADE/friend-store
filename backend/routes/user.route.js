import express from "express";
import { getusers,getsingleuser,deleteUser,
    getTestAdmin,
    updateTestAdmin,
    getsingleuserid,
    updateImg,
    updatepassword
    ,updateemail
    ,updatephone
    ,updatename
    ,decrement
    ,increment
} from "../controllers/user.controller.js";


const router = express.Router();

router.get("/", getusers)
router.get("/testAdmin", getTestAdmin)
router.put("/updateTestAdmin/:id", updateTestAdmin)
router.get("/single/:id", getsingleuser)
router.get("/singleid/:id", getsingleuserid)
router.delete("/:id", deleteUser)
router.put("/update/:id", updateImg)
router.put("/update-password/:id", updatepassword)
router.put("/update-email/:id", updateemail)
router.put("/update-phone/:id", updatephone)
router.put("/update-name/:id", updatename)
router.put("/decrement/:id", decrement)
router.put("/increment/:id", increment)


export default router;