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
        debt: 'Number',
        expenses: [expenseSchema]
    });

    var activitySchema = new mongoose.Schema({
        title: 'String',
        totalCosts: 'Number',
        members: [memberSchema],
        transfers: []
    });

    activitySchema.methods.calcTotalCosts = function() {
        var totalCosts = 0;
        this.members.forEach(function(member) {
            var memberCosts = 0;
            member.expenses.forEach(function(expense){
                totalCosts += expense.amount;
                memberCosts += expense.amount;
            });
            member.totalCosts = memberCosts;
        });

        this.totalCosts = totalCosts;
    };

    activitySchema.methods.calcMemberDebt = function() {
      var averageMemberCosts = this.totalCosts / this.members.length;
      this.members.forEach(function(member) {
        member.debt = member.totalCosts - averageMemberCosts;
      });
    };

    activitySchema.methods.settleDebts = function() {
      var beneficiaries = [], //Members who will receive money
          principals = [], //Members who will send money
          transfers = [],
          beneficiaryIndex = 0,
          principalIndex = 0;

      //group members in beneficiaries and principals
      this.members.forEach(function(member) {
        if(member.debt > 0) {
          beneficiaries.push(member);
        } else {
          principals.push(member);
        }
      });

      function collectTransfer(beneficiary, principal) {
        var amount = 0;
        var principalDebtAbsolute = Math.abs(principal.debt);

        if(principalDebtAbsolute > 0) {
          if (beneficiary.debt >= principalDebtAbsolute) {
            amount = principalDebtAbsolute; //principal transfers "everything"
          }
          else {
            amount = beneficiary.debt; //principal transfers only a part which is enough to satisfy the beneficiary
          }

          beneficiary.debt -= amount;
          principal.debt += amount;

          transfers.push({
            principal: principal,
            beneficiary: beneficiary,
            amount: amount
          });
        }

        if (beneficiary.debt > 0) {
          //Beneficiary is NOT satisfied
          //Recursive call of the collectTransfer function until the current beneficiary is satisfied
          //Do collectTransfer with the current beneficiary and the next principal
          principalIndex++;
          collectTransfer(beneficiary, principals[principalIndex]);
        }
        else {
          //Beneficiary is satisfied
          beneficiaryIndex++;
          if(beneficiaryIndex < beneficiaries.length) {
            //Recursive call of the collectTransfer function until all beneficiaries are satisfied
            //Do collectTransfer with the next beneficiary and the first principal
            principalIndex = 0;
            collectTransfer(beneficiaries[beneficiaryIndex], principals[principalIndex]);
          }
        }
      }

      if(beneficiaries.length > 0) {
        //Trigger recursive call of collectTransfer fn
        collectTransfer(beneficiaries[beneficiaryIndex], principals[principalIndex]);
      }

      this.transfers = transfers;
    };


    var Activity = mongoose.model('Activity', activitySchema);

    //get activity by id
    app.get('/api/activity/:id', function(req, res) {
        var activityId = req.params['id'];
        Activity.findOne({_id: activityId}, function(err, activity) {
            if (err) res.send(err);
            activity.calcTotalCosts();
            activity.calcMemberDebt();
            activity.settleDebts();
            res.json(activity);
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
                res.json(activity);
            }
        );
    });

    //route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./dist/index.html');
    });
};
