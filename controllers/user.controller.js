const jwt =  require("jsonwebtoken");
require('dotenv').config();
const key = process.env.LANG;

const createUser =  async (req,res) => {}
const getUsers = async (req, res) => {}
const getUsersById = async (req, res) => {}
const updateUsersById = async (req, res) => {}
const deleteUsersById = async (req, res) => {}

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
exports.updateUsersById = updateUsersById;
exports.deleteUsersById = deleteUsersById;