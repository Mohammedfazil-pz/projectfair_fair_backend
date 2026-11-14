const express=require('express');

const userController=require('../controllers/userController');
const projectController=require('../controllers/projectController')
const authentication=require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')

const router=new express.Router();

router.post('/register',userController.registerController);
router.post('/login',userController.loginController)
router.post('/addproject',authentication,multerMiddleware.single("projectImg"),projectController.addProject)
router.get('/homeprojects',projectController.getHomeProject)

router.get('/getAllProducts',authentication,projectController.getAllProjects)

router.get('/getuserProjects',authentication,projectController.getUserSpecifiedProjects)

router.put('/project/:id/update',authentication,multerMiddleware.single("projectImg"),projectController.updateProjects)

router.delete('/project/:id/delete',authentication,projectController.removeProject)

router.patch('/profileupdate',authentication,multerMiddleware.single('profileimage'),userController.editProfile)

router.get('/getuserdetails',authentication,userController.getProfileDetails)


module.exports=router;      
