const express = require('express');
const auth = require('./auth');
const billingSummaryService = require('../api/billingSummary/billingSummaryService');
module.exports = function(server){

    /*     
    * Rotas abertas     
    */
    const openApi = express.Router();
    server.use('/oapi', openApi);
    const AuthService = require('../api/user/authService');
    openApi.post('/login', AuthService.login);
    openApi.post('/signup', AuthService.signup);
    openApi.post('/validateToken', AuthService.validateToken)
    
    /*
     * Rotas protegidas por Token JWT     
     */

    const protectedApi = express.Router();
    server.use('/api', protectedApi);
    protectedApi.use(auth);

    //API routes
    // const router = express.Router();
    // server.use('/api', router);

    //route da API
    const billingCycleService = require('../api/billingCycle/billingCycleService');
    billingCycleService.register(protectedApi, '/billingCycles');

    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary);
};