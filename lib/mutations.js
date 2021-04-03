const ObjectId = require('mongodb').ObjectId;

const connectDB = require('../lib/db')
const errorHandler = require('../lib/errorHandler')

// Defaults para validar
const defaults = {
    categoria: ObjectId('6048b4def324e51f1cc51ebc'),
    usuario: ObjectId('60339b9e9d912e20fbc0bd04')
}

module.exports = {
    createProduct: async(root, { input }) => {
        // Una forma de juntar los dos objetos con Object.assign 
        // const newProduct = Object.assign(defaults, input)
        
        // Una forma de juntar los dos objetos con operador spread
        const newProduct = {
            ...input,
            ...defaults
        }

        let db
        let producto

        try {
            db = await connectDB();
            producto = await db.collection('productos').insertOne(newProduct)
            newProduct._id = producto.insertedId
        } catch (error) {
            errorHandler(error)
        }

        return newProduct;
    },

    updateProduct: async(root, { id, input }) => {
        
        let db
        let producto

        try {
            // Convertir la cadena en un mongo ID valido
            id = ObjectId(id)

            db = await connectDB();
            await db.collection('productos').findOneAndUpdate(
                { _id: id }, 
                { $set: input },
                { returnOriginal: false }
            )

            // Retornar el producto actualizado
            producto = await db.collection('productos').findOne({
                _id: id
            })

        } catch (error) {
            errorHandler(error)
        }

        return producto

    },

    addCategoryToProduct: async(root, {productID, categoryID}) => {
    
        let db
        let product
        let category

        try {
            // Convertir la cadena en un mongo ID valido
            productID = ObjectId(productID)

            // Convertir la cadena en un mongo ID valido
            categoryID = ObjectId(categoryID)

            db = await connectDB();

            // Retornar el producto actualizado
            product = await db.collection('productos').findOne({
                _id: productID
            })

            // Retornar el producto actualizado
            category = await db.collection('categorias').findOne({
                _id: categoryID
            })

            if(!product && !category){
                throw new Error('El producto o la categoria no existe')
            }

            await db.collection('productos').findOneAndUpdate(
                { _id: productID }, 
                { $set: { categoria: categoryID } },
                { returnOriginal: false }
            )

            return product

        } catch (error) {
            errorHandler(error)
        }


    }
}
