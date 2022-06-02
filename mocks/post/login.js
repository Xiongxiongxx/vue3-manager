module.exports = {
  path: '/api/users/login',
  template: (params, query, body) => {
    return {
      success: true,
			message: '',
			data: true
    };
  },
};
