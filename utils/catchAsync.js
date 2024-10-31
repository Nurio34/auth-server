const catchAsync = (fn) => {
    return (req, res, next) => {
        (async (req, res) => {
            const user = await User.findById(req.params.id);
            if (!user) {
                throw new Error("User not found"); // This will be caught by catchAsync
            }
            res.json(user);
        }).catch(next);
    };
};

module.exports = catchAsync;
