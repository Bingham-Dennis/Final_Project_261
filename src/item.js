function Item(itemName, itemPrice, itemDescription, itemQuantity) {
  this.name = itemName;
  this.price = itemPrice;
  this.description = itemDescription;
  this.quantity = itemQuantity;

  this.getName = function() {
    return this.name;
  }

  this.getPrice = function() {
    return this.price;
  }

  this.getDescription = function() {
    return this.description;
  }

  this.getQuantity = function() {
    return this.quantity;
  }
}

Item.prototype.removeItem = function() {
  this.quantity -= 1;
}

Item.prototype.addItem = function() {
  this.quantity += 1;
}

Item.prototype.alterPrice = function(price) {
  this.price = price;
}
