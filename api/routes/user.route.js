var userHandlers = require('../controllers/user.controller.js');
module.exports = function (app) {

	app.route('/user/islogin').get(userHandlers.loginRequired, userHandlers.isLogin);

	app.route('/user/register').post(userHandlers.createUser);

	app.route('/user/signin').post(userHandlers.sign_in);
};
