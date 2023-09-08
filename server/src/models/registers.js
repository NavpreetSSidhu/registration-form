const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required:true,
        unique:true
    },
    age: {
        type: Number,
        required:true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    pswd: {
        type: String,
        required: true
    },
   conpswd: {
        type: String,
        required: true
    }
});

employeeSchema.pre("save", async function(next) {
    this.pswd = await bcrypt.hash(this.pswd,10);
    this.conpswd = undefined;

    next();
})

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;