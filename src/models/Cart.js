export const ProductSchema = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        price: 'double', // Ensure price is a number
        image: 'string?',
    },
};
