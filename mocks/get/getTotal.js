module.exports = {
    path: '/api/getTotal',
    template: (params, query, body) => {
        return {
            success: true,
            message: '',
            data: {
                goodsTotal: 12,
                ordersTotal: 37318,
                salesTotal: 4112
            }
        };
    },
};
