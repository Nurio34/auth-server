const node_env = process.env.NODE_ENV;

const logout = (req, res) => {
    console.log("logout function");

    res.cookie("token", "LoggedOut", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: node_env === "production",
    });

    res.status(200).json({
        status: "success",
        message: "Logged out successfully ...",
    });
};

module.exports = logout;
