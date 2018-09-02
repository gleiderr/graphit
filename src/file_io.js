import {Node} from './graphit.js';

export const open_file = event => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = e => { 
			try {
				resolve(JSON.parse(e.target.result)); 
			} catch(e) {
				reject(e);
			}
		};
		reader.readAsText(event.target.files[0]);
	});
};

export const save_file = (file_name = 'graphit.json') => {
	let content = JSON.stringify(Node.json, null, 1);
    let blob = new Blob([content], { type: 'application/json' });
    let	anchor = document.createElement('a');

	anchor.download = file_name;
	anchor.href = window.URL.createObjectURL(blob);
	anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
	anchor.click();

	return Promise.resolve();
};