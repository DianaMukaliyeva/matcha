const express = require('express');
const router = express.Router();
const account = require('../controllers/account');
const middleware = require('../utils/middleware');

// @route   GET /account
// @desc    Return all users
// @access  Public
router.get('/', middleware.authRequired, account.getAll);

// @route   GET /account
// @desc    Return all users
// @access  Public
router.get('/auth', middleware.authWithStatus1, account.auth);

// @route   POST /account/register
// @desc    Create a new user
// @access  Public
router.post('/register', middleware.authForbidden, account.register);

// @route   POST /account/login
// @desc    Login into an account
// @access  Public
router.post('/login', middleware.authForbidden, account.login);

// @route   POST /account/pwdReset
// @desc    Reset a password
// @access  Public
router.post('/pwdReset', account.pwdReset);

// @route   POST /account/pwdUpdate
// @desc    Reset a password
// @access  Public
router.post('/pwdUpdate', account.pwdUpdate);

// @route   POST /account/activate
// @desc    Reset a password
// @access  Public
router.post('/activate', middleware.authForbidden, account.activate);

// @route   POST /account/validate
// @desc    Reset a password
// @access  Public
router.post('/validateData', account.validateData);

// @route   GET /account/notifications
// @desc    Get all tags
// @access  Public
router.get('/notifications', middleware.authRequired, account.getNotifications);

// @route   POST /account/notifications
// @desc    Edit notification settings: email, push
// @access  Private
router.post('/notifications', middleware.authRequired, account.editNotifications);

// @route   GET /account/auth/google/login
// @desc    Login via google
// @access  Public
router.get('/auth/google/login', middleware.authForbidden, account.getGoogleLink);

// @route   GET /account/google/login
// @desc    Login via google
// @access  Public
router.get('/auth/google', middleware.authForbidden, account.googleLogin);

// @route   GET /account/google/register
// @desc    Login via google
// @access  Public
router.post('/auth/google/register', middleware.authForbidden, account.registerGoogle);

// @route   GET /account/logout
// @desc    Logout active user
// @access  Public
router.post('/logout', account.logout);

module.exports = router;
