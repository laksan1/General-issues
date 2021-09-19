/**
 * Filter by date in mongo through aggregation 
 */
const lastDays = moment(new Date()).subtract(1, 'day').toDate();
const sessions = await Sessions.aggregate([
    { $match: { startTime: { $gt: lastDays } } },
    {
        $project: {
            'userAdName': 1, 'departament': 1, 'centralPath': 1, 'startTime': 1,
            'endTime': 1, 'commonTime': 1, 'idlingTime': 1
        }
    },
    //{ $group : { _id : "$departament", users: { $push: "$userAdName" } } },
    { $sort: { 'startTime': -1 } }
]);

/**
 * Last item in a sorted collection by field + grouping
 */

const lastSessions = await Sessions.aggregate(
    [
        { $sort: { startTime: 1, } },
        {
            $group:
            {
                _id: "$userAdName",
                doc: { $last: "$$ROOT" }
            }
        },
        { $replaceRoot: { newRoot: "$doc" } },
        {
            $project:
            {
                'userAdName': 1, 'departament': 1, 'centralPath': 1,
                'startTime': 1, 'endTime': 1, 'commonTime': 1, 'idlingTime': 1
            }
        }
    ]
);

/**
 * Filtering, grouping, summation in an array of subtraction a and b
 */

const cleanTimeSessions = await Sessions.aggregate([
    { $match: { startTime: { $gt: lastDays } } },
    {
        $group: {
            _id: "$userAdName",
            cleanTime: { $sum: { $subtract: ["$commonTime", "$idlingTime"] } }
        }
    },
    {
        $project:
        {
            name: '$_id',
            cleanTime: '$cleanTime',
        }
    }
]);

/**
 * Create a new file and read
 */
const fs = require('fs');
const path = 'C:\\Users\\a.a.laktionov\\Desktop\\TEST.txt';

fs.writeFile(`${path}`, 'BIM TEAM!', function (err) {
    if (err) throw new Error(err);
    fs.rename
    fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
        if (err) throw new Error(err);
        console.log(data);
    })
});

/**
 * Add element to array
 */

await FamilyTaskManagers.updateOne(
    { cloudFile: match.cloudFile },
    { $push: { managers: newManager } }
);

/**
 * Remove element from array
 */

await FamilyTaskManagers.updateOne(
    { cloudFile: manager.cloudFile.centralPath },
    { $pull: { managers: { _id: manager.name._id } } }
);

/**
 * Search by Regex
 */
const sessionMatch = await Sessions.findOne({ 'centralPath': new RegExp(modelName, 'gi') }); // 1 способ

const test = await Sessions.aggregate([{ $project: { 'centralPath': 1 } }]); // 2 способ (плохой)
const centralPath = test.find(x => x.centralPath.includes(modelName))?.centralPath; //TODO REGEX

const sessionMatch = await Sessions.findOne({ $text: { $search: modelName } }); // 3 способ, работает только с индексом

/**
 * Short note aggregate (match and group)
 */
const test = TopLevelCategory.aggregate()
    .match({ firstCategory })
    .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } }
    })
    .exec();
