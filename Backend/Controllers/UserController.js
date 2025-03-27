const UserModel = require("../Models/UserModel");

//Display Data
const getAllDetails = async (req, res, next) => {
    let userData;
    try {
        userData = await UserModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!userData) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ userData });
};

//Insert Data
const addData = async (req, res, next) => {
    const { fullName, email, password, phone, address } = req.body;

    try {
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) { 
            return res.status(400).json({ message: "Email already exists" });
        }
    
        const userData = new UserModel({
            fullName,
            email,
            password,
            phone,
            address
        });

        await userData.save();

        return res.status(200).json({ userData });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let userData;
    try {
        userData = await UserModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!userData) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ userData });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { fullName, email, password, phone, address } = req.body;

    let userData;

    try {
        userData = await UserModel.findByIdAndUpdate(id, {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone,
            address: address
        });
        userData = await userData.save();
    } catch (err) {
        console.log(err);
    }
    if (!userData) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ userData });
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let userData;

    try {
        userData = await UserModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!userData) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ userData });
};
// Login Controller
const login = async (req, res, next) => {
    const { email, password } = req.body;

    let userData;

    try {
        userData = await UserModel.findOne({ email: email });

        if (!userData) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        if (userData.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful", userData });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.login = login;