const URL = "https://letsrevolutionizetesting.com/challenge.json";

function containsProp(prop, json) {
	return prop in json;
}

function getProp(prop, json) {
	return json[prop];
}

function getQueryParams(url) {
	const params = new URLSearchParams(url.split("?")[1]);
	return params.get("id");
}

async function fetchRequest(challengeId = "") {
	let message = null;

	const response = await fetch(
		`${URL}${challengeId ? `?id=${challengeId}` : ""}`
	);

	const responseData = await response.json();
	console.log(responseData);

	if (containsProp("follow", responseData)) {
		const follow = getProp("follow", responseData);
		const id = getQueryParams(follow);
		return fetchRequest(id);
	} else if (containsProp("message", responseData)) {
		message = getProp("message", responseData);
	}

	return message;
}

const solution = async () => {
	const finalMessage = await fetchRequest();
	console.log(finalMessage);
};

solution();
