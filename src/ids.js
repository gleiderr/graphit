export let newId;

export const setup_id = obj => { 
	let lastID = 0;
	for (let id in obj) lastID = Math.max(parseInt(id, 36), lastID);
	console.log(lastID);

	const newIdGenerator = keyGen(lastID, () => 0);

	newId = () => newIdGenerator.next().value;
};

function* keyGen(init = 0, next = Date.now) {
	let lastKey = init;
	while(true) {
		yield (lastKey = Math.max(next(), lastKey + 1)).toString(36);
	}
}

