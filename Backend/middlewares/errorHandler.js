const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler;
