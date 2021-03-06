/**
 * Created by chandrika2311 on 4/15/17.
 */
/**
 * Created by chandrika2311 on 3/21/17.
 */

var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model('UserModel', UserSchema);



UserModel.createUser = createUser;
UserModel.deleteUserCourse = deleteUserCourse;
UserModel.spliceProjectFromUser = spliceProjectFromUser;
UserModel.findUserByFacebookId = findUserByFacebookId;
UserModel.deleteUser = deleteUser;
UserModel.findAllMentors = findAllMentors;
UserModel.findUserByGoogleId = findUserByGoogleId;
UserModel.addProjectToStudentplusMentor = addProjectToStudentplusMentor;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findAllUsers = findAllUsers;

UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.setModel = setModel;


function createUser(user) {
    console.log("username",user.username);
    console.log("password",user.password);
    var user_new ={
        CompanyName: user.Company,
        industry: user.industry,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        email: user.email,
        role:   user.role
    } ;
    console.log("mode user creation:", user_new);
    return UserModel.create(user_new)
}
function findUserByCredentials(username, password) {

    return UserModel.findOne({username: username, password: password});
}
function updateUser(userId, user) {

    return UserModel.update({_id : userId},
        {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            password:user.password

        });
}
function setModel(_model) {
    model = _model;
}
function findUserByUsername(username) {
    return UserModel.findOne({ username: username });
}
function findUserByGoogleId(googleId) {

    return UserModel.findOne({'google.id': googleId})
        .then(function (user) {
            console.log("user in findUserby google id",user);

        },function (err) {
            console.log(err);

        });
}
function findUserByFacebookId(facebookId) {
    return UserModel.findOne({'facebook.id': facebookId});
}

function findUserById(userId){
    return UserModel.findById(userId);
}
function findAllMentors() {

    return UserModel.find({role :'mentor'});
}
function findAllUsers() {

    return UserModel.find({});

}

function deleteUser(userId) {
return UserModel.remove({_id: userId});
}

function spliceProjectFromUser(userId,projectId) {
    return UserModel.findUserById(userId)
        .then(function (user) {
            var projects = user.projects;
            var applications = user.ProjectApplications;

            var index_s = projects.indexOf(projectId);
            var index_a = applications.indexOf(projectId);

            console.log("user after the changes", user);
            if (index_s > -1){
                projects.splice(index_s,1);
            }
            if (index_a > -1){
                projects.splice(index_a,1);
            }
            user.projects = projects;
            user.ProjectApplications = applications;

            console.log("user after the changes", user);
            return user.save();
        })

}
function deleteUserCourse(userId, courseId) {
    return UserModel.findUserById(userId)
        .then(function (user) {
                    var courselist = user.courses;
                    var index = courselist.indexOf(courseId);
                    if (index > -1){
                        index = index + 1;
                        courselist.splice(index,1);
                    }

            return UserModel.update({_id : userId},
                {
                    courses : courselist
                });

                });
}

function addProjectToStudentplusMentor(userId,mentorId,projectId) {
    return UserModel.findById(userId)
        .then(function (user) {
            return UserModel.findById(mentorId)
                .then(function (mentor) {
                    return  model.ProjectModel.findProjectById(projectId)
                        .then(function (project) {
                            mentor.mentorWorkingWith.push(user);
                            mentor.save();
                            user.studentWorkingWith.push(mentor);
                            user.projects.push(projectId);
                            user.save();
                        })


                })

        })

}
function addProjectToStudentplusMentor() {
    
}
module.exports = UserModel;
//
// var adminUser = {
//     username : "admin",
//     password: "admin",
//     role:"admin"
//
// };
// UserModel.create(adminUser);
