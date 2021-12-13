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

/**
 * Function lookup, addFields, $function and returning a typed result 
 */
const result = await productModel.aggregate([
    {
        $match: {
            categories: dto.category
        }
    },
    {
        $sort: {
            _id: 1
        }
    },
    {
        $limit: dto.limit
    },
    {
        $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews'
        }
    },
    {
        $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
            // reviews:{
            // 	$function: {
            // 		body:  `function(reviews) {
            // 			reviews.sort((a, b) => new Date(b.createdAt ) - new Date(b.createdAt ))
            // 			return reviews
            // 		}`,
            // 		args: ['reviews'],
            // 		lang: 'js'
            // 	}
            // }
        }
    }
]).exec() as (ProductModel & { review: ReviewModel[], reviewCount: number, reviewAvg: number })[];



/**
 * Get Amount group (await + length)
 */
departamentAmount: (await Sessions.aggregate().group({ _id: { departament: "$departament" } })).length


/*
 * Hard Calculation of mongo
 */
aggreagation
    .group({
        _id: { userAdName: "$userAdName" },
        commonTime: { $sum: "$commonTime" },
    })
    .project({
        userAdName: '$_id.userAdName',
        commonTime: '$commonTime',
        workingTimePercentage: {
            $round:
                [{
                    $divide:
                        [{
                            $multiply:
                                ['$commonTime', percentage]
                        }, { $multiply: [8 * +lastDay, minutes] }]
                }, 0]
        }
    })
    .sort({ userAdName: 1 });


/*
* Added bulkWrite() performs multiple operations on the collection:
*/
db.characters.bulkWrite([
    { insertOne: { "document": { "_id": 4, "char": "Dithras", "class": "barbarian", "lvl": 4 } } },
    { insertOne: { "document": { "_id": 4, "char": "Taeln", "class": "fighter", "lvl": 3 } } },
    {
        updateOne: {
            "filter": { "char": "Eldon" },
            "update": { $set: { "status": "Critical Injury" } }
        }
    },
    { deleteOne: { "filter": { "char": "Brisbane" } } },
    {
        replaceOne: {
            "filter": { "char": "Meldane" },
            "replacement": { "char": "Tanys", "class": "oracle", "lvl": 4 }
        }
    }
], { ordered: false });

/*
* Added expr()
*/
db.sessions.find({$expr:  {$eq: ['$userAdName', 'Лактионов Александр']}})

db.sessions.find( { $expr: { $gt: [ "$commonTime" , "$idlingTime" ] } } )

/*
* Added unwind (devide fild as array by item)
*/
// EXAMPLES --------------------------------
db.inventory.insertOne({ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] })
db.inventory.aggregate( [ { $unwind : "$sizes" } ] )
// RESULT --------------------------------
{ "_id" : 1, "item" : "ABC1", "sizes" : "S" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "M" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "L" }

