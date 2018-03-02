// @flow
export type GeneralInfo = {
	color?: string,
	city?: string,
	companyId?: string,
	description: string,
	featureDescription?: Array<string>,
	id: string,
	propertyType: string,
	subtitle?: string,
	tier?: number,
	title?: string,
	updatedAt: string,
	website?: string,
	unitTypeCategory?: string
};

export type ProjectLink = {
	projectName: string, 
	city: string, 
	id: number
};