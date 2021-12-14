/**
 * Lodash chain example
 */

function getCommonTimeValues(sessions) {
    return _.chain(sessions)
        .map(s => {
            return {
                date: moment(s.startTime).format(SIMPLE_DATE_FORMAT),
                user: s.userAdName,
                commonTime: s.commonTime || 0,
                commonIdlingTime: s.idlingTime || 0
            }
        })
        .sortBy(['date'])
        .filter(c => c.commonTime !== 0)
        .groupBy('date')
        .reduce((result, list, dateAsKey) => {
            const item = {
                name: dateAsKey,
                users: _.uniq(list.map((item) => {
                    return item.user
                })),
                value: _.reduce(list, (sum, el) => {
                    return sum + _.toNumber(((el.commonTime - el.commonIdlingTime) / 60).toFixed(1))
                }, 0)
            }
            result.push(item)
            return result;
        }, [])
        .map((d) => {
            return {
                name: moment(d.name, SIMPLE_DATE_FORMAT),
                users: d.users,
                value: d.value
            }
        })
        .sort((a, b) => a.name.valueOf() - b.name.valueOf())
        .map((d) => {
            return {
                name: d.name.format(SIMPLE_DATE_FORMAT),
                users: d.users,
                value: d.value
            }
        })
        .value();
}


/**
 * Added forkJoin
 */
reloadTable(): void {
    this.showLoader = true;
    this.aSub$ = forkJoin({
        cloudModels: this.familyTasksCommunicatorSettingService.fetch(),
        users: this.characteristicsUsersService.fetch()
    })
        .pipe(catchError(error => of(error)))
        .subscribe(
            ({ cloudModels, users }) => {
                this.cloudModels = cloudModels;
                this.users = users;
                this.filteredUsers = this.users?.map(u => u.name);
                this.isEmpty = this.cloudModels.length === 0 ? true : false;
            },
            error => console.log(error.error.message)
        );

    console.log('filteredUsers!', this.filteredUsers);
    this.showLoader = false;
}