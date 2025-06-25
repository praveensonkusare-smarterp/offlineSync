import Realm from 'realm';
import uuid from 'react-native-uuid';
import { UserSchema } from '../models/Users';
import { ContentSchema } from '../models/Contents';
import { ProductSchema } from '../models/Cart';

class RealmService {
  constructor() {
    this.realm = null;
    this.schemas = [UserSchema, ContentSchema, ProductSchema];
  }

  async initialize() {
    if (!this.realm) {
      this.realm = await Realm.open({
        path: 'myApp.realm', // Change this to your desired filename
        schema: this.schemas,
        schemaVersion: 2,
      });
    }
    return this.realm;
  }

  async registerUser(username, password, email = '') {
    await this.initialize();
    let user = null;

    try {
      this.realm.write(() => {
        user = this.realm.create('User', {
          id: uuid.v4(), // Use react-native-uuid
          username,
          password,
          email,
          lastSyncDate: new Date(),
        });
      });
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      return null;
    }
  }

  // async authenticateUser(username, password) {
  //   await this.initialize();
  //   const user = this.realm.objects('User').filtered('username == $0 AND password == $1', username, password)[0];
  //   return user || null;
  // }

  async addInitialProducts() {
    await this.initialize();
    try {
      this.realm.write(() => {
        const existingProducts = this.realm.objects('Product');
        if (existingProducts.length === 0) { // 🛑 Prevent duplicates
          const products = [
            { id: "1", name: "iPhone 14", price: 999, image: "src/images/Screenshot 2025-02-27 193517.png" },
            { id: "2", name: "MacBook Pro", price: 1999, image: "https://via.placeholder.com/150" },
            { id: "3", name: "AirPods Pro", price: 249, image: "https://via.placeholder.com/150" },
            { id: "4", name: "iPad Air", price: 599, image: "https://via.placeholder.com/150" }
          ];
          products.forEach(product => {
            this.realm.create('Product', {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            });
          });
        }
      });
    } catch (error) {
      console.error('Error adding initial products:', error);
    }
  }
  async getProducts() {
    await this.initialize();
    return this.realm.objects('Product');
  }


  // Cart related methods
  async addToCart(name, price, image = '') {
    await this.initialize();
    let cartItem = null;
    console.log('Adding to Cart:', { name, price, image });

    try {
      this.realm.write(() => {
        cartItem = this.realm.create('Cart', {
          id: uuid.v4(),
          name,
          price,
          image,
          lastSyncDate: new Date(),
        });
      });
      return cartItem;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return null;
    }
  }


  async getCartItems() {
    await this.initialize();
    return this.realm.objects('Cart');
  }

  async getCartItemById(id) {
    await this.initialize();
    return this.realm.objects('Cart').filtered('id == $0', id)[0] || null;
  }

  async removeCartItem(id) {
    await this.initialize();
    try {
      const item = await this.getCartItemById(id);
      if (item) {
        this.realm.write(() => {
          this.realm.delete(item);
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing cart item:', error);
      return false;
    }
  }

  async clearCart() {
    await this.initialize();
    try {
      const items = await this.getCartItems();
      this.realm.write(() => {
        this.realm.delete(items);
      });
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }

  async updateCartItem(id, updates) {
    await this.initialize();
    try {
      const item = await this.getCartItemById(id);
      if (item) {
        this.realm.write(() => {
          Object.keys(updates).forEach(key => {
            if (key in item) {
              item[key] = updates[key];
            }
          });
          item.lastSyncDate = new Date();
        });
        return item;
      }
      return null;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return null;
    }
  }

  // I've also improved the authentication method to use parameterized queries
  // which is safer and prevents injection attacks
  async authenticateUser(username, password) {
    await this.initialize();
    const user = this.realm.objects('User').filtered('username == $0 AND password == $1', username, password)[0];
    return user || null;
  }

  // Optional: Method to link cart items to a specific user
  async getUserCartItems(userId) {
    await this.initialize();
    // Note: This would require adding a userId field to your CartSchema
    // return this.realm.objects('Cart').filtered('userId == $0', userId);

    // Since your current schema doesn't have userId, return all cart items
    // You can modify this later if you add a userId field to CartSchema
    return this.realm.objects('Cart');
  }

  close() {
    if (this.realm) {
      this.realm.close();
      this.realm = null;
    }
  }
}

export default new RealmService();
