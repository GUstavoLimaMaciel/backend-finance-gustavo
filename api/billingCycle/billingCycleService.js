const BillingCycle = require('./billingCycle');
const _ = require('lodash');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({new: true, runValidators: true});

BillingCycle.after('post', sendErrorsOrNext)
            .after('put', sendErrorsOrNext);

function sendErrorsOrNext(req, res, next){
    const bundle = res.locals.bundle;

    if(bundle.errors){
        var errors = parseErrors(bundle.errors);
        res.status(500).json({errors: errors});
    } else {
        next();
    }
}

function parseErrors(noderestfulErrors){
    const errors = [];
    _.forIn(noderestfulErrors, error => errors.push(error.message));
    return errors;
}

BillingCycle.route('count', function(req, res, next){
    BillingCycle.count(function(error, value){
        if(error){
            res.status(500).json({errors:[erorr]});
        } else {
            res.json({value: value});
        }
    });
});

module.exports = BillingCycle;