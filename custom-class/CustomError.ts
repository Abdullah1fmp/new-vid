export class CustomError extends Error {
	status: number;

	constructor(message: string, status: number, name?: string) {
		super(message);
		this.status = status;
		this.name = name || "CustomError";
	}
}
