//Plus Code product

db.collection('cart')
  .doc(this.obj.id)
  .update({
    amount: this.obj.amount + 1,
  })
  .then(() => {
    db.collection('cart')
      .doc(this.obj.id)
      .get()
      .then((res) => {
        productLoader.close();
        let obj = res.data();
        this.obj = { ...obj, id: res.id };
        this.cartAmount.innerHTML = obj.amount;
      });
  });

//Minsu code product

productLoader.open();
db.collection('cart')
  .doc(this.obj.id)
  .update({
    amount: this.obj.amount - 1,
  })
  .then(() => {
    db.collection('cart')
      .doc(this.obj.id)
      .get()
      .then((res) => {
        productLoader.close();
        let obj = res.data();
        this.obj = { ...obj, id: res.id };
        this.cartAmount.innerHTML = obj.amount;
      });
  });
