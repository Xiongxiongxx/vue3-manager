module.exports = {
    path: '/api/getGoodsList',
    template: (params, query, body) => {
        return {
            success: true,
            message: '',
            data: {
                list: [
                    { id: 14, img: "http://127.0.0.1:8000/uploads/upload_32487201527174efccf70405f85494af.jpeg", name: "睡衣", classify: "1,3", isNew: "0", price: 67, is_del: "0" },
                    { id: 13, img: "http://127.0.0.1:8000/uploads/upload_05bdf8a90c6d97761674f8fc3361556d.jpeg", name: "卫衣", classify: "1,3", isNew: "0", price: 90, is_del: "0" },
                    { id: 12, img: "http://127.0.0.1:8000/uploads/upload_93cb2dcf960d9016b471883983da3742.jpeg", name: "衬衣", classify: "1,9", isNew: "0", price: 89, is_del: "0" },
                    { id: 10, img: "http://127.0.0.1:8000/uploads/upload_2a50b9f4d8dcd42d447d92943765ddff.jpeg", name: "黑色短袖", classify: "1,9", isNew: "0", price: 33, is_del: "0" },
                    { id: 9, img: "http://127.0.0.1:8000/uploads/upload_19b2483ee6212faa136f41ad4dc8985f.jpg", name: "白色短袖", classify: "1,9", isNew: "0", price: 33, is_del: "0" },
                    { id: 8, img: "http://127.0.0.1:8000/uploads/upload_841b3fbb05ccd1bf8a1351340b3c5759.jpeg", name: "爱心短裤", classify: "8,2", isNew: "0", price: 98, is_del: "0" },
                    { id: 7, img: "http://127.0.0.1:8000/uploads/upload_075af2f4f06cfdef751c60de7b2dda92.jpeg", name: "白色裙子", classify: "8,5,6", isNew: "1", price: 257, is_del: "0" },
                    { id: 6, img: "http://127.0.0.1:8000/uploads/upload_785a9b19925811959d7ddd61a3ba1365.jpeg", name: "运动裤", classify: "8,4", isNew: "1", price: 122, is_del: "0" },
                    { id: 5, img: "http://127.0.0.1:8000/uploads/upload_f0cc78af896abcb11dadc2f835839c9a.jpeg", name: "黑色长袖", classify: "1,3", isNew: "1", price: 122, is_del: "0" },
                    { id: 4, img: "http://127.0.0.1:8000/uploads/upload_1e63779142d229ac53fa407b4c66e611.jpeg", name: "橘黄色", classify: "1,9", isNew: "1", price: 334, is_del: "0" }
                ],
                total: 12, 
                currentPage: 1, 
                pageSize: 10
            }
        };
    },
};
