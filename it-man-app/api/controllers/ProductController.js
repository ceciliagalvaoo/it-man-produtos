/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    create: async function (req, res) {
        try {
            const { name, description, price } = req.allParams();

            const newProduct = await Product.create({
                name,
                description,
                price
            }).fetch();

            return res.json(newProduct);
        } catch (error) {
            return res.serverError(error);
        }
    },

    // FEITO: Complete a função find do ProductController
    // Lembre-se de criar uma constante para armazenar o produto que você quer encontrar
    // Lembre-se de retorná-lo como json
    // Lembre-se de lidar com casos de erros
    find: async function (req, res) {
        try {
            const products = await Product.find();
            if (!products) {
                return res.notFound('Sem produtos cadastrados');
            }
            return res.json(products);

        } catch (error) {
            return res.serverError(error);
        }
    },

    findOne: async function (req, res) {
        try {
            const productId = req.param('id');
            const product = await Product.findOne({ id: productId });
            if (!product) {
                return res.notFound('Produto não encontrado');
            }
            return res.json(product);
        } catch (error) {
            return res.serverError(error);
        }
    },

    // FEITO: Complete a função update do ProductController
    // Dica: A função update usa o id do produto assim como a função delete ou a findOne, use de base
    // Dica: A função update insere informações para um produto assim como a função create, use de base
    update: async function (req, res) {
        try {
            // Pegando os parâmetros do request
            const { id, name, description, price } = req.allParams();
    
            // Verifica se o ID foi fornecido
            if (!id) {
                return res.badRequest('ID do produto é obrigatório');
            }
    
            // Atualizando o produto com base no ID fornecido
            const updatedProducts = await Product.update({ id }).set({
                name,
                description,
                price
            }).fetch();
    
            // Verificando se algum produto foi atualizado
            if (updatedProducts.length === 0) {
                return res.notFound('Produto não encontrado');
            }
    
            // Retornando a lista de produtos atualizados
            return res.json(updatedProducts);
        } catch (error) {
            // Tratamento de erro
            return res.serverError(error);
        }
    },

    delete: async function (req, res) {
        try {
            const productId = req.param('id');
            const deletedProduct = await Product.destroyOne({ id: productId });
            if (!deletedProduct) {
                return res.notFound('Produto não encontrado');
            }
            return res.json(deletedProduct);
        } catch (error) {
            return res.serverError(error);
        }
    },
};
