import fs from "fs";

export const saveBase64AsFile = (
	base64Data: string,
	filePath: string
): string => {
	const base64WithoutHeader = base64Data.replace(
		/^data:[a-zA-Z0-9\/]+;base64,/,
		""
	);
	const buffer = Buffer.from(base64WithoutHeader, "base64");

	try {
		fs.writeFileSync(filePath, buffer);
		return filePath;
	} catch (err) {
		console.error(err);
		return "";
	}
};
