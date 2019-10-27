const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dish = require('../models/user');
const Uder=require('..models/user')
const product=require('../models/product');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());


dishRouter.route()