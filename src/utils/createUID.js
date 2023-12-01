export default function getUID() {
	const uid = Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0);
	return uid;
}
