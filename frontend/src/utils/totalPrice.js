export const totalPrice = (pr) => {
  let total = 0;
  pr.forEach((i)=>( 
    total += i.amount * i.price
  ));
  return total;
}
