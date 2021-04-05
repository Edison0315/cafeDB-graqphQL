const ObjectId = require('mongodb').ObjectId;

const connectDB = require('../lib/db')
const errorHandler = require('../lib/errorHandler')

module.exports = {

    getProducts: async() => {
        let db
        let products = []

        try {
            db = await connectDB();
            products = await db.collection('productos').find().toArray()
        } catch (error) {
            errorHandler(error)
        }

        return products;
    },
    
    getProduct: async(root, { id }) => {
        let db
        let product

        try {
            // Convertir la cadena en un mongo ID valido
            id = ObjectId(id)

            db = await connectDB();
            product = await db.collection('productos').findOne({
                _id: id
            })
        } catch (error) {
            errorHandler(error)
        }

        return product
    },

    searchItems: async(root, { keyword }) => {
        let db
        let items
        let products
        let categories

        try {
            db = await connectDB();
            
            products = await db.collection('productos').find({ 
                $text: { $search: keyword } 
            }).toArray()

            categories = await db.collection('categorias').find({ 
                $text: { $search: keyword } 
            }).toArray()

            items = [...products, ...categories]
            
        } catch (error) {
            errorHandler(error)
        }

        return items
    },
}