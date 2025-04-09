const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    projectImg: { type: String, required: true },
    projectTitle: { type: String, required: true },
    projectLanguage: { type: String, required: true },
    projectOverview: { type: String, required: true },
    projectGitLink: { type: String, required: true },
    projectWebsiteLink: { type: String, required: true },
    userID: { type: String, required: true },
})

const projects = mongoose.model("projects", productsSchema)

module.exports = projects