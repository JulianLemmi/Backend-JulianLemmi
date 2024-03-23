class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        this.products = []; // Inicializa el arreglo de productos como vacío al crear una instancia
    }

    // Método para agregar un producto al arreglo de productos
    addProduct(title, description, price, thumbnail, code, stock) {
        const product = new Product(title, description, price, thumbnail, code, stock);
        this.products.push(product);  
    }

    // Método para eliminar un producto del arreglo de productos
    removeProduct(productCode) {
        this.products = this.products.filter(product => product.code !== productCode);
        
    }

    // Método para obtener todos los productos
    getProducts() {
        return this.products;
    }

    // Método para obtener un producto por su ID
    getProductById(productId) {
        const product = this.products.find(product => product.code === productId);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado");
        }
    }
    
}

const productManager = new ProductManager(); // Crear una instancia de ProductManager

productManager.addProduct("Proteína en polvo", "Proteína para aumentar masa muscular", 50, "imagen1.jpg", 1, 20);
productManager.addProduct("Vitaminas", "Multivitaminas para una nutrición completa", 30, "imagen2.jpg", 2, 30);
console.log(productManager.getProducts()); // Llamar a los métodos en la instancia de ProductManager
productManager.getProductById(2);
productManager.getProductById(3);
productManager.removeProduct(1);
console.log(productManager.getProducts());