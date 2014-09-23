module.exports = function(app) {
    var mongoose = require('mongoose');

    var expenseSchema = new mongoose.Schema({
        title: 'String',
        comment: 'String',
        amount: 'Number'
    });

    var memberSchema = new mongoose.Schema({
        name: 'String',
        email: 'String',
        totalCosts: 'Number',
        expenses: [expenseSchema]
    });

    var activitySchema = new mongoose.Schema({
        title: 'String',
        totalCosts: 'Number',
        members: [memberSchema]
    });

    var Activity = mongoose.model('Activity', activitySchema);

    activitySchema.methods.calcTotalCosts = function() {
        var totalCosts = 0;
        this.members.forEach(function(member) {
            var memberCosts = 0;
            member.expenses.forEach(function(expense){
                totalCosts += expense.amount;
                memberCosts += expense.amount;
            });
            member.totalCosts = memberCosts;
            member.save();
        });

        this.totalCosts = totalCosts;
        this.save(function (err, result) {
            if (err) console.log(err);
        });
    }

    //get activity by id
    app.get('/api/activity/:id', function(req, res) {
        var activityId = req.params['id'];
        Activity.findOne({_id: activityId}, function(err, result) {
            if (err) res.send(err);
            res.json(result);
        });
    });

    //new activity
    app.post('/api/activity', function(req, res) {
        var activity = new Activity(req.body);
        activity.save(function (err, result) {
            if (err) res.send(err);
            res.json(result);
        });
    });

    //update activity
    app.put('/api/activity', function(req, res) {
        Activity.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {},
            function (err, activity) {
                if (err) res.send(err);
                activity.calcTotalCosts();
                res.json(activity);
            }
        );
    });

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
