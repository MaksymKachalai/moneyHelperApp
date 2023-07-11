const { dbQuery } = require('../../db');

const addTransaction = async (req, res) => {
  let categoryId = null;
  const { body, user } = req;
  const { userId } = user;
  const { amount, category } = body;

  const categoryResult = await dbQuery('SELECT * FROM categories WHERE category_name=$1 ', [category]);

  if (categoryResult.rows.length === 0) {
    categoryId = await dbQuery('INSERT INTO categories(category_name) VALUES($1) RETURNING category_id', [category]);
  } else {
    categoryId = categoryResult;
  }

  const result = await dbQuery(
    'INSERT INTO transactions(user_id, category_id, transaction_amount) VALUES($1, $2, $3) RETURNING *;',
    [userId, categoryId.rows[0].category_id, amount]
  );

  res.json(result.rows[0]);
};

module.exports = { addTransaction };
