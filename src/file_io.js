import {Node} from './graphit.js';
//import {show} from './facade.js';

export const set_file = json => {
	Node.json = json;
};

export const open_file = (event, show) => {
	const reader = new FileReader();
	reader.onload = (e) => {
		try {
			set_file(JSON.parse(e.target.result));
			show();
		} catch(exception) {
			console.error(exception);
			set_file({});
			show();
		}
	};

	reader.readAsText(event.target.files[0]);
};

export const save_file = (file_name = 'graphit.json') => {
	let content = JSON.stringify(Node.json, null, 1);
    let blob = new Blob([content], { type: 'application/json' });
    let	anchor = document.createElement('a');

	anchor.download = file_name;
	anchor.href = window.URL.createObjectURL(blob);
	anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
	anchor.click();

	console.log({save_at: Date()});
};