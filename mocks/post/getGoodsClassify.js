module.exports = {
    path: '/api/getGoodsClassify',
    template: (params, query, body) => {
        return {
            success: true,
            message: "",
            data: [
                {
                    id: 8,
                    pid: 0,
                    name: "下装",
                    children: [{
                        id: 5,
                        pid: 8,
                        name: "裙子",
                        children: [{
                            id: 7,
                            pid: 5,
                            name: "短裙"
                        },
                        {
                            id: 6,
                            pid: 5,
                            name: "长裙"
                        }]
                    },
                    {
                        id: 4,
                        pid: 8,
                        name: "长裤"
                    },
                    {
                        id: 2,
                        pid: 8,
                        name: "短裤"
                    }]
                },
                {
                    id: 1,
                    pid: 0,
                    name: "上衣",
                    children: [{
                        id: 9,
                        pid: 1,
                        name: "短袖"
                    },
                    {
                        id: 3,
                        pid: 1,
                        name: "长袖"
                    }]
                }]
        };
    },
};
