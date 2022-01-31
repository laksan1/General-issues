/**
 * Creating a new collection 
 * from an old one using the same fields
 **/

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
 **/
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
* Update not good IDLING, Not working
**/
use('userstatistics');
db.sessions.update(
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
 * Insert new collection from JSON
 **/
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
 **/
use('userstatistics');
db.test.aggregate([
    { match: { createdElements: { $size: 3 } } }
])


/**
 * 
 * Group by sub field
 **/
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
 * Replace collection from Desktop
 * Possible Exeption: key $oid must not start with '$'
 **/

use('userstatistics');
// const path = 'C:\\Users\\a.a.laktionov\\Desktop\\Debugger.json';
const path = 'C:\\Users\\a.a.laktionov\\Desktop\\sessions.json';
const file = require(path);
db.session.remove({});
db.newCollection.insertMany(file);

/**
 * Filter by date gte and lte
 **/
{ DateAdded: { $gt: ISODate('2019-09-18T21:07:42.313+00:00'), $lt: ISODate('2019-09-20T21:08:42.313+00:00') } }
{ warningsUser: { $gt: ISODate('2019-09-18T21:07:42.313+00:00'), $lt: ISODate('2019-09-20T21:08:42.313+00:00') } }

/**
 * Sort By field
 **/
use('userstatistics');
db.sessions.aggregate([
    { $project: { 'userAdName': 1, 'idlingTime': 1 } },
    { $sort: { 'idlingTime': -1 } },
    { $limit: 15 }
], { allowDiskUse: true })

/**
 * Different between idlingTime and commonTime
 **/
use('userstatistics');
db.sessions.aggregate([
    { $project: { 'userAdName': 1, 'startTime': 1, 'idlingTime': 1, 'commonTime': 1 } },
    {
        $addFields: {
            differenceTime: { $subtract: ["$commonTime", "$idlingTime"] },
        }
    },
    { $sort: { 'differenceTime': -1 } },
    { $limit: 15 }
], { allowDiskUse: true })

/**
 * Remove documents by conditions TODO
 **/
use('userstatistics');
db.sessions.remove([
    {
        $addFields: {
            differenceTime: { $subtract: ["$commonTime", "$idlingTime"] },
        }
    },
    { differenceTime: { $gte: 500 } },
    true
]);

/**
 * Copy collection
 **/
use('userstatistics');
db.settings.find().forEach(
    function (x) {
        db.test.insert(x)
    }
);

/**
 *  Find elements by own conditions
 **/
use('userstatistics');
db.sessions.find({
    $where: function () {
        if (this.commonTime - this.idlingTime > 400)
            return this.commonTime
    }
}).count()

/**
 *  Remove elements by own conditions
 **/
use('userstatistics');
db.sessions.remove({
    $where: function () {
        if (this.commonTime - this.idlingTime > 400)
            return this.commonTime
    }
});

/**
 * Add new fied
 **/
use('userstatistics');
db.test.find().forEach(
    function (x) {
        value = x.a;
        if (value.includes('/')) {
            newValue = value.split('/')[1];
            x.projectId = newValue;
        }
        db.test1.insertOne(x)
    }
);

/**
 * Import collection (Not working)
 **/
mongoimport--db userstatistics--collection test--file C: \Users\a.a.laktionov\Desktop\test.json

/**
 * Insert sessions for the last 1 months
 */
use('userstatistics');
start = ISODate('2021-10-16T21:00:00.000Z')
db.session.find().forEach(
    function (x) {
        if (x.startTime > start) {
            db.test.insert(x)
        }
    }
);


/**
 * Insert sessions for the last 1 months
 */
use('userstatistics');
db.sessions.find().forEach(
    function (x) {
        if (x.revitVersion === '') {
            x.revitVersion = '2020'
        }

        console.log('VERSION', x.revitVersion);
    }
);

/**
 * Update all fields of collection by condition
 */
use('userstatistics');
db.sessions.updateMany({ revitVersion: '' }, { $set: { revitVersion: '2020' } })

use('userstatistics');
db.sessions.updateMany({ departament: 'Отдел систем  отопления и вентиляции' }, { $set: { departament: 'Отдел систем отопления и вентиляции' } })


use('userstatistics');
db.sessions.updateMany({ isAnotherDepartment: true }, { $set: { isAnotherDepartment: false } })


/**
 * Added  field 'city' of collection by condition
 */

use('userstatistics');
db.characteristicsusers.updateMany({ $or: [{ city: null }, { city: { $exists: false } }, { city: '' }] }, { $set: { city: "Москва" } })


/**
 * Added  field 'revitVersion' of collection by condition
 */
use('userstatistics');
db.sessions.updateMany({ $or: [{ revitVersion: null }, { revitVersion: { $exists: false } }, { revitVersion: '' }] }, { $set: { revitVersion: "2020" } })


/**
* Added  field 'idlingTime' of collection by condition
*/
use('userstatistics');
db.nikatimes.updateMany({ $or: [{ idlingTime: null }, { idlingTime: { $exists: false } }] }, { $set: { idlingTime: 0 } })


/**
*  Added  field 'projectName' of collection by condition
*/
use('userstatistics');
db.sessions.updateMany({ $or: [{ projectName: null }, { projectName: { $exists: false } }] }, { $set: { projectName: '' } })

/**
 * Remove departament by userAdName
 */
use('userstatistics');
db.nikatimes.updateMany({ $or: [{ userAdName: 'Харченко Дарья' }, { userAdName: { $exists: true } }] }, { $set: { departament: 'Департамент информационного моделирования и автоматизации' } })


/**
 * Insert  field 'projectId' of collection by condition
 */

use('userstatistics');
db.sessions.find().forEach(
    function (s) {
        if (s.projectId === '' && s.projectName === '' && !s.centralPath.toLowerCase().endsWith('.rfa') && s.centralPath.toLowerCase().startsWith('rsn')) {
            fullProjectId = s.centralPath.split("/")[3];
            if (fullProjectId?.length > 8) {
                console.log('fullProjectId', fullProjectId);
                s.projectId = fullProjectId.substr(0, 7) ?? '';
            }
            //s.projectName = s.centralPath.split("/")[3] ?? '';
        }
    }
);

/**
 * 
 * Group by field to compass
 */
{
    _id: { city: '$city' }
}

/**
 * 
 *For Compass. Filter by startTime
 */
FILTER: { startTime: {$gte: new Date('2022-01-21')}, endTime: {$lte: new Date('2022-01-24')}, userAdName: 'Котельников Сергей'}

{ startTime: {$gte: new Date('2022-01-24')}, endTime: {$lte: new Date('2022-01-25')}, userAdName: 'Ваш Реймонд'}
SORT: {startTime: -1};