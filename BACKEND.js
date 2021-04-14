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