
export default function useJson() {

	function filter(json, key, needle) {
		const result = [];
		for (var i = 0; i < json.length; i++) {
			if (json[i][key].toLowerCase().includes(needle.toLowerCase())) {
				result.push(json[i]);
			}
		}

		return result;
	}

	return { filter }
}
