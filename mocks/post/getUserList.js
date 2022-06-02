module.exports = {
    path: '/api/getUserList',
    template: (params, query, body) => {
        return {
            success: true,
            message: "",
            data: {
                "list": [
                    { id: 23, name: "三三", gender: "0", position: "1", orders: "4554", sales: "234", is_del: "0" },
                    { id: 22, name: "二二", gender: "0", position: "1", orders: "32432", sales: "3534", is_del: "0" },
                    { id: 21, name: "一一", gender: "0", position: "0", orders: "332", sales: "344", is_del: "0" },
                    { id: 13, name: "小牛", gender: "1", position: "1", orders: "0", sales: "0", is_del: "0" },
                    { id: 12, name: "小杜", gender: "1", position: "1", orders: "0", sales: "0", is_del: "0" },
                    { id: 11, name: "小陈", gender: "1", position: "1", orders: "0", sales: "0", is_del: "0" },
                    { id: 10, name: "熊熊", gender: "1", position: "1", orders: "0", sales: "0", is_del: "0" },
                    { id: 9, name: "郑郑", gender: "1", position: "1", orders: "0", sales: "0", is_del: "0" },
                    { id: 8, name: "小吴", gender: "1", position: "1", orders: "0", sales: "0", is_del: "0" },
                    { id: 7, name: "周周", gender: "1", position: "1", orders: "0", sales: "0", is_del: "0" }
                ],
                total: 15,
                currentPage: 1,
                pageSize: 10
            }
        };
    },
};
