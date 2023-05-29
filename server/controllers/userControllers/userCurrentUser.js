const currentUser = async (req, res) => {
  const { user } = req;

  res.json({
    user,
  });
};

module.exports = {
  currentUser,
};
