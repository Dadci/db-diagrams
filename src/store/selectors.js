import { createSelector } from '@reduxjs/toolkit';

export const selectTables = state => state.tables.tables;
export const selectSchemas = state => state.schemas.schemas;

export const selectTablesBySchemaId = createSelector(
    [selectTables, (_, schemaId) => schemaId],
    (tables, schemaId) => tables.filter(table => table.schemaId === schemaId)
);

export const selectSchemaById = createSelector(
    [selectSchemas, (_, schemaId) => schemaId],
    (schemas, schemaId) => schemas.find(s => s.id === schemaId)
);