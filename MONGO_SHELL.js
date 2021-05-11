/**
 * Creating a new collection 
 * from an old one using the same fields
 */

use('userstatistics');
db.informationusers.find().forEach((user) => {
    let sessions = [];
    departament = user.departament;
    userAdName = user.userAdName;
    userRevitName = user.userRevitName;
    centralPath = '';
    user.models.forEach((model) => {
        centralPath = model.centralPath;
        model.sessions.forEach((item) => {
            const session = {
                userAdName,
                userRevitName,
                departament,
                centralPath,
                isSynchronized: item.isSynchronized,
                startTime: item.startTime,
                endTime: item.endtime,
                commonTime: item.commonTime,
                idlingTime: item.idlingTime,
                warningsUser: item.warningsUser,
                elementsCreated: item.elementsCreated,
                elementsModifed: item.elementsModifed,
                countElementsDeleted: item.countElementsDeleted
            };
            sessions.push(session);
        })
    });
    db.sessions.insertMany(sessions);
});



/**
 * Removing from collection documents by value of field
 */
use('missioncontrol');
db.addins.remove({ pluginName: 'IEK - ' }
);

/**
 * Remove values ​​a less than b
 */
use('userstatistics');
db.test.remove({ $where: "this.commonTime < this.idlingTime" }
);



/**
* Update not good IDLING
*/
use('userstatistics');
db.test.update(
    { $where: "this.commonTime < this.idlingTime" },
    {
        $set: {
            idlingTime:
            {
                $subtract:
                    ["$commonTime",
                        {
                            $divide: ["$commonTime", 3]
                        }
                    ]
            }
        }
    },
    { multi: true }
);

/**
 * 
 * Insert new collection from JSON
 */
use('userstatistics');
db.test.insertMany([
    {
        "name_button_event": "ButtonEventTemplate",
        "is_pressed_button_event": false,
        "condition_button_event": false
    },
    {
        "name_button_event": "ButtonParamAutoWriteRefresh",
        "is_pressed_button_event": false,
        "condition_button_event": false
    },
    {
        "name_button_event": "ButtonMepSystemAutorefresh",
        "is_pressed_button_event": false,
        "condition_button_event": false
    }
]);

/**
 * 
 * Return elements witch createdElements SIZE = 3
 */
use('userstatistics');
db.test.aggregate([
    { match: { createdElements: { $size: 3 } } }
])


/**
 * 
 * Group by sub field
 */
use('userstatistics');
db.test.aggregate([

    {
        $group: {
            _id: { x: "$x.mdoels.centralPath" },
            y: { $first: "$y" }
        }
    }
])

/**
 *
 * Replace collection from Desktop
 * Possible Exeption: key $oid must not start with '$'
 */

use('userstatistics');
// const path = 'C:\\Users\\a.a.laktionov\\Desktop\\Debugger.json';
const path = 'C:\\Users\\a.a.laktionov\\Desktop\\sessions.json';
const file = require(path);
db.session.remove({});
db.newCollection.insertMany(file);

/**
 * Import Collection
 *
 */
// mongoimport -d userstatistics

/**
 * Filter by date gte and lte
 */
{ DateAdded: { $gt: ISODate('2019-09-18T21:07:42.313+00:00'), $lt: ISODate('2019-09-20T21:08:42.313+00:00') } }
{ warningsUser: { $gt: ISODate('2019-09-18T21:07:42.313+00:00'), $lt: ISODate('2019-09-20T21:08:42.313+00:00') } }

/**
 * Sort By field
 */
use('userstatistics');
db.sessions.aggregate([
    { $project: { 'userAdName': 1, 'idlingTime': 1 } },
    { $sort: { 'idlingTime': -1 } },
    { $limit: 15 }
], { allowDiskUse: true })


/**
 * Different between idlingTime and commonTime
 */
use('userstatistics');
db.sessions.aggregate([
    { $project: { 'userAdName': 1,'startTime': 1, 'idlingTime': 1, 'commonTime': 1 } },
    {
        $addFields: {
            differenceTime: { $subtract: ["$commonTime", "$idlingTime"] },
        }
    },
    { $sort: {'differenceTime': -1 }},
    { $limit: 15 }
], { allowDiskUse: true })