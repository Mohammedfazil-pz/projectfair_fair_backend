const projects = require('../database/models/projectModel')
const allprojects = require('../database/models/projectModel')


exports.addProject=async(req,res)=>{
    const userID=req.userID
    const {projectTitle,projectLanguage,projectOverview,projectGitLink,projectWebsiteLink}=req.body
    const projectImg=req.file.filename

    try {
        const existingProject=await allprojects.findOne({projectGitLink})
        if(existingProject){
            res.status(409).json("Project already exists!")
        }else{
            const projects=new allprojects({
                projectTitle, projectImg,projectLanguage,projectOverview,projectGitLink,projectWebsiteLink,userID
            })
            await projects.save()
            res.status(201).json(projects)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

exports.getHomeProject=async(req,res)=>{
    try {
        const data=await projects.find().limit(3)
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({err:error})
    }
}

exports.getAllProjects=async(req,res)=>{
    let {search}=req.query
    try {
        let allprojects=await projects.find({projectLanguage:{$regex:search,$options:'i'}})
        res.status(200).json(allprojects)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUserSpecifiedProjects=async(req,res)=>{
    let userID=req.userID
    try {
        let userProjects=await projects.find({userID})
        res.status(200).json(userProjects)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.updateProjects=async(req,res)=>{
    let userID=req.userID
    let id=req.params.id
    const {projectImg,projectTitle,projectLanguage,projectOverview,projectGitLink,projectWebsiteLink}=req.body;

    const updatedImage=req.file?req.file.filename:projectImg
    try {
        const updateProject=await projects.findByIdAndUpdate({_id:id},{projectImg,projectTitle,projectLanguage,projectOverview,projectGitLink,projectWebsiteLink,userID,projectImg:updatedImage},{new:true})

        let newUpdatedProject=await updateProject.save()

        res.status(200).json(newUpdatedProject)


    } catch (error) {
        res.status(500).json(error)
    }
}


exports.removeProject=async(req,res)=>{
    const id=req.params.id
    try {

        const deleteProject=await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProject)

    } catch (error) {
        console.log(error)
        res.json(500).json(error)
    }
}