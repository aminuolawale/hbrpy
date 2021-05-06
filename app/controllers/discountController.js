const createDiscount = async (req, res) => {
    const { name, type, value, base_value } = req.body;
  
    const dateCreated = moment(new Date());
    const createDiscountQuery = `INSERT INTO
          discount(name, type, value, base_value, dateCreated)
          VALUES($1, $2, $3, $4, $5)
          returning *`;
    const values = [name, dateCreated];
  
    try {
      const { rows } = await dbQuery.query(createDiscountQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = "Operation was not successful";
      return res.status(status.error).send(errorMessage);
    }
  };
  

  const getDiscounts = async (req, res) => {
    const getDiscountsQuery = `select * from discount order by id desc`;
  
    try {
      const { rows } = await dbQuery.query(getDiscountsQuery);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = "There are no discounts";
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = "An error Occured";
      return res.status(status.error).send(errorMessage);
    }
  };


  const getDiscountByType = async (req, res) => {
    const { type } = req.params;
    const getDiscountQuery = `select * from discount where type=$1 order by id desc`;
    values = [type];
    try {
      const { rows } = await dbQuery.query(getDiscountQuery, values);
      const dbResponse = rows[0];
      if (dbResponse[0] === undefined) {
        errorMessage.error = `There is no discount with type ${type}`;
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = "An error Occured";
      return res.status(status.error).send(errorMessage);
    }
  };
  
  
  const getDiscountByName = async (req, res) => {
      const { name } = req.params;
      const getDiscountQuery = `select * from discount where name=$1 order by id desc`;
      values = [name];
      try {
        const { rows } = await dbQuery.query(getDiscountQuery, values);
        const dbResponse = rows[0];
        if (dbResponse[0] === undefined) {
          errorMessage.error = `There is no discount with name ${name}`;
          return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
      } catch (error) {
        errorMessage.error = "An error Occured";
        return res.status(status.error).send(errorMessage);
      }
    };
    