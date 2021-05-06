const getInvoice = async (req, res) => {
  const { billId } = req.params;
  const getBillQuery = `select * from bill where id=$1 order by id desc`;
  values = [billId];
  let bill;
  try {
    const { rows } = await dbQuery.query(getBillQuery, values);
    const bill = rows[0];
    if (bill[0] === undefined) {
      errorMessage.error = `There is no bill with id ${billId}`;
      return res.status(status.notfound).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage);
  }

  const getRelationshipQuery = ` select * from relationship where customer_id=$1 and store_id=$2`;
  values = [bill.customer_id, bill.store_id];
  let relationship;
  try {
    const { rows } = await dbQuery.query(getRelationshipQuery, values);
    relationship = rows[0];
  } catch (error) {
    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage);
  }
  const discounts = [];
  const getDiscountQuery = `select * from discount where name=$1 order by id desc`;
  values = [relationship.type];
  const { rows } = await dbQuery.query(getDiscountQuery, values);
  const discount = rows[0];
  discounts.push({
    value: discount.value,
    type: discount.type,
    base: discount.base_value,
  });
  const OldestBillQuery = `select * from bill where customer_id=$1 order by id asc limit 1`;
  values = [bill.customer_id];
  const { rows } = await dbQuery.query(OldestBillQuery, values);
  const oldestBill = rows[0];
  const now = new Date();
  const customerQuery = `select * from customer where id=$1`;
  const values = [bill.customer_id];
  const { rows } = await dbQuery.query(customerQuery, values);
  const customer = rows[0];
  const customerTime = customer.dateCreated;
  customerTime.setYear(customerTime.getYear() + 2);
  if (customerTime <= now) {
    const getDiscountQuery = `select * from discount where name=$1 order by id desc`;
    values = ["2-years"];
    const { rows } = await dbQuery.query(getDiscountQuery, values);
    const discount = rows[0];
    discounts.push({
      value: discount.value,
      type: discount.type,
      base: discount.base_value,
    });
  }
  const getDiscountQuery = `select * from discount where name=$1 order by id desc`;
    values = ["all-customers"];
    const { rows } = await dbQuery.query(getDiscountQuery, values);
    const discount = rows[0];
    discounts.push({
      value: discount.value,
      type: discount.type,
      base: discount.base_value,
    });
    let maxPercent = 0;
    let computedPercent = 0
    let amount = bill.amount;
    for (d in discounts){
        if (d.type === "percent"){
            maxPercent = Math.max(maxPercent, d.value)
        }
        else {
            if (!computedPercent){
                computedPercent = true;
                amount *= maxPercent;
            }
            if (d.type === "deduction") {
                amount -= 5 * bill.amount/100
            }
        }
    }
    successMessage.data = {"total":amount};
    return res.status(status.success).send(successMessage);
};
