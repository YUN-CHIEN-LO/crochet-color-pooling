export type stitch = {
	color: string;
	count: number;
};
export type unit = {
	color: stitch;
	index: number;
	group?: number;
};
export type pattern = Array<unit>;
