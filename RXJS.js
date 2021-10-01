
    const users = [
		{ name: 'Anna', age: 20 },
		{ name: 'gdfg', age: 30 },
		{ name: 'gfd', age: 40 },
		{ name: 'gdfg', age: 55 },
		{ name: 'fdgd', age: 70 },
		{ name: 'bbbb', age: 80 },
		{ name: 'bddrrr', age: 90 }
	  ];
	  interval(1000).pipe(
		filter(v => users[v].age > 40),
		map(v => users[v].name)
	  ).subscribe(user => console.log('user', user));