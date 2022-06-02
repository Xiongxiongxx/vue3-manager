module.exports = {
    path: '/api/getUserList',
    template: (params, query, body) => {
        return {
            data: true,
            message: "",
            success: true
        };
    },
};
