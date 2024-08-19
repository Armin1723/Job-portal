import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Company } from "../models/companySchema.js";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";

//Checking whether all the given job schema data's are provided and authentication part for each field if user didn't provide throw an error

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { title, description, salary, noOfOpenings, niches, company, postedBy, location } = req.body;

    const jobData = {
        title,
        description,
        location,
        salary,
        noOfOpenings,
        niches : niches.length > 0 ? niches : [],
        company,
        postedBy,
    };

    const job = await Job.create(jobData);
    await User.findByIdAndUpdate(postedBy, { $push: { postedJobs: job._id } });
    await Company.findByIdAndUpdate(company, { $push: { jobs: job._id } });

    const updatedUser = await User.findById(postedBy,{
        password: 0
    });
    

    res.status(201).json({
        success: true,
        message: "Job posted successfully.",
        job,
        user : updatedUser
    })
});


//getting all jobs details 
// export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
//     const { city, niche, searchKeyword } = req.query;
//     const query = {};
//     if (city) {
//         query.location = city;
//     }
//     if (niche) {
//         query.jobNiche = niche;
//     }
//     if (searchKeyword) {
//         query.$or = [
//             { title: { $regex: searchKeyword, $options: "i" } },
//             { companyName: { $regex: searchKeyword, $options: "i" } },
//             { introduction: { $regex: searchKeyword, $options: "i" } },
            
//         ];
//     }
//     const jobs = await Job.find(query);
//     res.status(200).json({
//         success: true,
//         jobs,
//         count: jobs.length
//     });


export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
    let { city, niche, page } = req.query;

    if (!page) {
        page = 1;
    }

    const query = {};
    if (city) {
        query.location = city;
    }
    if (niche) {
        query.title = niche;
    }
    const jobs = await Job.find(query,{
        title: 1,
        salary: 1,
        location: 1,
        description: 1,
        company: 1
    }).populate({
        path: "company",
        select: "name logo location"
    }).sort({ createdAt: -1 }).limit(8).skip(( page - 1) * 8);
    
    if(jobs.length === 0){
        return res.status(404).json({
            success: false,
            message: "Jobs not found."
        });
    }
    
    res.status(200).json({
        success : true,
        jobs,
        totalPages : Math.ceil(jobs.length / 8)
        
    });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
    const myJobs = await Job.find({ postedBy: req.user_id });
    res.status(200).json({
        success: true,
        myJobs,
    });

});

//deleting jobs 
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Oops! Job not found.", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted."
    });

    
});

//getting a single job 
export const getASingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const job = await Job.findById(id,{}.populate("company", "name logo location"));
    res.status(200).json({
        success: true,
        job
    }); 
    if (!job) {
        return next(new ErrorHandler("Oops! Job not found.", 404));
    }
});

//fetching jobs small details for right nav
export const fetchSmallCards = catchAsyncErrors(async (req, res) => {
    const jobs = await Job.find().select("title salary location company").limit(4).populate("company", "name logo location");
    const companies = await Company.find().select("name logo location").limit(4);
    res.status(200).json({
        success: true,
        jobs,
        companies
    });
});

export const fetchMyJobs = catchAsyncErrors(async (req, res) => {
    const type = req.query.type;
    const userId = req.query.userId;
    const page = req.query.page;
    const user = await User.findById(userId).populate({
        path: type,
        select: "title salary location description company",
        populate: {
            path: "company",
            select: "name logo location"
        },
        sort : { createdAt: -1 },
        limit: 8,
        skip: (page - 1) * 8
    })
    const totalJobs = await User.findById(userId).select(type);
    res.status(200).json({
        success: true,
        myJobs : user[type],
        totalPages : Math.ceil(totalJobs[type].length / 8 )
    });
})