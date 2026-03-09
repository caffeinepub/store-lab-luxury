import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Category = {
    #watch;
    #shoe;
  };

  type Product = {
    id : Text;
    name : Text;
    brand : Text;
    price : Float;
    description : Text;
    category : Category;
    imageUrl : Text;
    featured : Bool;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  let products = Map.empty<Text, Product>();

  // Initialize with sample inventory
  public shared ({ caller }) func initialize() : async () {
    let initialProducts : [Product] = [
      // Luxury Watches
      {
        id = "1";
        name = "Rolex Submariner";
        brand = "Rolex";
        price = 9950.00;
        description = "The iconic diver's watch, known for its durability and timeless design. Stainless steel case, black dial, and unidirectional rotatable bezel.";
        category = #watch;
        imageUrl = "https://rolex.submariner.jpg";
        featured = true;
      },
      {
        id = "2";
        name = "Patek Philippe Nautilus";
        brand = "Patek Philippe";
        price = 30500.00;
        description = "A luxury sports watch with an octagonal bezel, blue dial, and stainless steel bracelet. Renowned for its elegance and craftsmanship.";
        category = #watch;
        imageUrl = "https://patek.nautilus.jpg";
        featured = true;
      },
      {
        id = "3";
        name = "Audemars Piguet Royal Oak";
        brand = "Audemars Piguet";
        price = 25000.00;
        description = "The first luxury sports watch made of stainless steel, featuring a unique octagonal bezel and 'Tapisserie' patterned dial.";
        category = #watch;
        imageUrl = "https://ap.royal.oak.jpg";
        featured = false;
      },
      {
        id = "4";
        name = "Richard Mille RM 11";
        brand = "Richard Mille";
        price = 150000.00;
        description = "A high-tech watch with a tonneau-shaped case, skeletonized dial, and intricate chronograph movement. Known for its bold design.";
        category = #watch;
        imageUrl = "https://richard.mille.rm11.jpg";
        featured = false;
      },
      {
        id = "5";
        name = "Omega Speedmaster";
        brand = "Omega";
        price = 6350.00;
        description = "The first watch worn on the moon, with a black dial, tachymeter bezel, and manual-wind chronograph movement.";
        category = #watch;
        imageUrl = "https://omega.speedmaster.jpg";
        featured = true;
      },
      // Luxury Shoes
      {
        id = "6";
        name = "Christian Louboutin So Kate";
        brand = "Christian Louboutin";
        price = 775.00;
        description = "Classic pointed-toe stiletto with a signature red sole, crafted from patent leather for a sleek and sophisticated look.";
        category = #shoe;
        imageUrl = "https://louboutin.so.kate.jpg";
        featured = true;
      },
      {
        id = "7";
        name = "Manolo Blahnik Hangisi";
        brand = "Manolo Blahnik";
        price = 985.00;
        description = "Elegant satin pumps adorned with a Swarovski crystal buckle, perfect for adding a touch of glamour to any outfit.";
        category = #shoe;
        imageUrl = "https://manolo.hangisi.jpg";
        featured = false;
      },
      {
        id = "8";
        name = "Jimmy Choo Romy";
        brand = "Jimmy Choo";
        price = 650.00;
        description = "A timeless pointed-toe pump available in a variety of materials, known for its comfortable fit and versatile style.";
        category = #shoe;
        imageUrl = "https://jimmy.choo.romy.jpg";
        featured = true;
      },
      {
        id = "9";
        name = "Gucci Horsebit Loafers";
        brand = "Gucci";
        price = 730.00;
        description = "Luxury leather loafers featuring the iconic horsebit hardware, offering a perfect blend of comfort and style.";
        category = #shoe;
        imageUrl = "https://gucci.horsebit.jpg";
        featured = false;
      },
      {
        id = "10";
        name = "Bottega Veneta BV Lido";
        brand = "Bottega Veneta";
        price = 1270.00;
        description = "Chic square-toe mules with a woven leather upper, showcasing the brand's signature intrecciato craftsmanship.";
        category = #shoe;
        imageUrl = "https://bottega.lido.jpg";
        featured = false;
      },
    ];

    for (product in initialProducts.values()) {
      products.add(product.id, product);
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) { p.featured }
    );
  };

  public query ({ caller }) func getProductById(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(id : Text, updatedProduct : Product) : async () {
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.add(id, updatedProduct);
  };
};
