import {Node} from './graphit.js';

export const open_file = (event) => {
	const reader = new FileReader();
	reader.onload = (e) => {
		try {
			Node.json = JSON.parse(e.target.result);
		} catch(exception) {
			console.error(exception);
			Node.json = {};
		}
	};

	reader.readAsText(event.target.files[0]);
};

export const save_file = () => {
	let content = JSON.stringify(Node.json, null, 1);
    let blob = new Blob([content], { type: 'text/plain' });
    let	anchor = document.createElement('a');

	anchor.download = "graphit.json";
	anchor.href = window.URL.createObjectURL(blob);
	anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
	anchor.click();
};

export const set_file = json => {
	Node.json = json;
};