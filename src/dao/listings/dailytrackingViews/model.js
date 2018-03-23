// @flow
import Sequelize from 'sequelize';
const DATABASE_NAME = 'default';
import MysqlClient from '../../../libs/connections/MysqlClient';
const { client: dailyTrackingClient } = new MysqlClient(DATABASE_NAME);

export default dailyTrackingClient.define('daily_tracking_views', {
	createdDate: {
		type: Sequelize.DATEONLY,
		primaryKey: true,
		field: 'd_date',
		defaultValue: Sequelize.NOW
	},
	projectId: {
		type: Sequelize.INTEGER,
		field: 'ads_project_id',
		allowNull: false
	},
	listingId: {
		type: Sequelize.INTEGER,
		field: 'ads_id',
		allowNull: false,
		defaultValue: 0
	},
	propertyType: {
		type: Sequelize.CHAR(2),
		field: 'property_type',
	},
	propertyCategory: {
		type: Sequelize.CHAR(1),
		field: 'property_category',
	},
	clientType: {
		type: Sequelize.TEXT,
		field: 'client_type',
	},
	accessSource: {
		type: Sequelize.INTEGER,
		field: 'access_source',
	},
	productStatus: {
		type: Sequelize.INTEGER,
		field: 'product_status',
	},
	viewed: {
		type: Sequelize.INTEGER,
		field: 'viewed',
		allowNull: true,
		defaultValue: 0
	},
	phoneLeadSRP: {
		type: Sequelize.INTEGER,
		field: 'phone_lead_serp',
		allowNull: true,
		defaultValue: 0
	},
	phoneLeadDetail: {
		type: Sequelize.INTEGER,
		field: 'phone_lead_listdetail',
		allowNull: true,
		defaultValue: 0
	},
	phoneLeadDeveloper: {
		type: Sequelize.INTEGER,
		field: 'phone_lead_developer',
		allowNull: true,
		defaultValue: 0
	},
	srpMailLead: {
		type: Sequelize.INTEGER,
		field: 'mail_lead_serp',
		allowNull: true,
		defaultValue: 0
	},
	pdpMailLead: {
		type: Sequelize.INTEGER,
		field: 'mail_lead_listdetail',
		allowNull: true,
		defaultValue: 0
	},
	developerMailLead: {
		type: Sequelize.INTEGER,
		field: 'mail_lead_developer',
		allowNull: true,
		defaultValue: 0
	},
	brochureClicked: {
		type: Sequelize.INTEGER,
		field: 'click_brochure',
		allowNull: true,
		defaultValue: 0
	},
	brochureLead: {
		type: Sequelize.INTEGER,
		field: 'lead_brochure',
		allowNull: true,
		defaultValue: 0
	}
});