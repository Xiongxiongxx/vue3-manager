module.exports = {
  path: '/api/users/register',
  template: (params, query, body) => {
    return {
      success: true,
			message: '',
			data: true
    };
  },
};
