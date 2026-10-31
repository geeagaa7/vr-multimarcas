import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),data:text('data').notNull()});
export const bikes=sqliteTable('bikes',{id:text('id').primaryKey(),slug:text('slug').notNull().unique(),data:text('data').notNull()});
export const testimonials=sqliteTable('testimonials',{id:text('id').primaryKey(),data:text('data').notNull()});
export const events=sqliteTable('events',{id:text('id').primaryKey(),source:text('source').notNull(),bikeId:text('bike_id'),createdAt:text('created_at').notNull()});
