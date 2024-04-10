const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: "Document deleted!",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        document,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);

    const document = await query;

    // const document = await Model.findById(req.params.id).populate({
    //   path: "creator",
    //   select: "name",
    // });

    if (!document) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.json({
      status: "success",
      data: {
        document,
      },
    });
  });

exports.getAll = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();

    if (populateOptions) query = query.populate(populateOptions);

    const document = await query;

    res.json({
      status: "success",
      results: document.length,
      data: {
        document,
      },
    });
  });
