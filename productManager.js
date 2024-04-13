const fs = require('fs');

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
    constructor(filePath) {
        this.path = filePath; // Ruta del archivo de persistencia
        this.products = this.loadProducts(); // Inicializa los productos cargando desde el archivo
    }

    addProduct(productData) {
        const productId = this.generateId();
        const product = new Product({ ...productData, code: productId });
        this.products.push(product);
        this.saveProducts(); // Guarda los productos en el archivo después de agregar uno nuevo
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex(product => product.code === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts(); // Guarda los productos en el archivo después de actualizar uno
        } else {
            console.error("Producto no encontrado");
        }
    }

    deleteProduct(productId) {
        this.products = this.products.filter(product => product.code !== productId);
        this.saveProducts(); // Guarda los productos en el archivo después de eliminar uno
    }

    generateId() {
        // Generar un ID autoincrementable
        return 'PROD' + (this.products.length + 1).toString().padStart(3, '0');
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        return this.products.find(product => product.code === productId);
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error("Error al cargar productos:", err);
            return [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.error("Error al guardar productos:", err);
        }
    }
}

const productManager = new ProductManager('productos.json'); // Crear una instancia de ProductManager con la ruta del archivo

// Ejemplo de uso: Agregar un producto
productManager.addProduct({
    "title": "Nissan Sentra",
    "description": "Sedán económico",
    "price": 20000,
    "thumbnail": "sentra.jpg",
    "stock": 12
});

// Ejemplo de uso: Actualizar un producto
productManager.updateProduct("HON002", { price: 28000, stock: 9 });

// Ejemplo de uso: Eliminar un producto
productManager.deleteProduct("TOY001");

// Ejemplo de uso: Obtener todos los productos
console.log("Todos los productos:");
console.log(productManager.getProducts());

// Ejemplo de uso: Obtener un producto por ID
console.log("Producto con ID 'HON002':");
console.log(productManager.getProductById("HON002"));
