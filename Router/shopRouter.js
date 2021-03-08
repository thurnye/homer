const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../Controller/shop/shop');

router.get('/', shopController.getlandingPage); //landingpage
router.get('/audio', shopController.getInteractiveAudioPage); //audio
router.get('/read-the-book', shopController.getReadTheBookPage); //read-the-book
router.get('/home', shopController.getHomePage); //the-homepage
router.get('/buy-the-book', shopController.getBuyTheBookPage); //buy-the-book
router.get('/about-the-author', shopController.getAuthorPage); //about-the-author

module.exports = router;