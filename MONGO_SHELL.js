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