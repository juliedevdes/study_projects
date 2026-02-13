// /**
//  * @constructor
//  */
// function HashTableMgr() {
//     this.products = [];
//     this.hashBucket = {};
//     this.count = 0;
// }

// HashTableMgr.prototype.set = function (productName, price) {
//     this.products.push({ productName, price });
//     this.hashBucket[productName] = { index: this.count, key: productName };

//     this.count++;
// };

// HashTableMgr.prototype.getPrice = function (productName) {
//     var bucketEntry = this.hashBucket[productName];
//     if (bucketEntry) {
//         return this.products[bucketEntry.index].price;
//     }
//     return undefined;
// };

// module.exports = HashTableMgr;

/**
 * @constructor
 */
function HashTableMgr() {
    this.products = new Array(1000);
    this.capacity = 1000;
}

HashTableMgr.prototype.hash = function (key) {
    var hash = 0;

    for (var i = 0; i < key.length; i++) {
        hash = hash + key.charCodeAt(i);
    }
    return hash % this.capacity;
};

HashTableMgr.prototype.set = function (productName, price) {
    var productHash = this.hash(productName);
    this.products[productHash] = { price, productName };
};

HashTableMgr.prototype.getPrice = function (productName) {
    var productHash = this.hash(productName);
    var product = this.products[productHash];

    return product ? product.price : undefined;
};

module.exports = HashTableMgr;
