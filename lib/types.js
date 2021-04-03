const ObjectId = require('mongodb').ObjectId;

const connectDB = require('../lib/db')
const errorHandler = require('../lib/errorHandler')

module.exports = {
    Product: {

        categoria: async({ categoria }) => {

            let db
            let category
            let id

            try {
                db = await connectDB();
                id = categoria ? ObjectId(categoria): '';
                category = await db.collection('categorias').findOne(
                    {_id:id}
                )
            } catch (error) {
                errorHandler(error)
            }

            return category;

        }

    }
};
