import {body,validationResult} from "express-validator"

function validateRequest(req,res,next){
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}



export const validateRegisterUserLocal=[
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("please provide a valid email"),
    
    body("contact")
    .notEmpty().withMessage("Contact is required")
    .matches(/^\d{10}$/).withMessage("contact must be a 10-digit number"),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:8}).withMessage("Password must be at least 8 characters"),
    
    body("fullName")
    .notEmpty().withMessage("Full name is required")
    .isLength({min:3}).withMessage("Fullname must be at least 3 character long"),
    validateRequest

    
    
]
export const loginValidatorLocal=[
     body("email")
     .optional()
    .trim()
    .isEmail().withMessage("please provide a valid email"),
    
    body("contact")
    .optional()
    .matches(/^\d{10}$/).withMessage("contact must be a 10-digit number"),

    body("password")
    .notEmpty().withMessage("Password is required"),

    body()
    .custom((value)=>{
        if(!value.email && !value.contact){
            throw new Error("Email or contact is required");
        };
        return true;
    }),
    validateRequest
]