export const MONGODB_TYPES = {
    STRING: 'String',
    NUMBER: 'Number',
    DATE: 'Date',
    BOOLEAN: 'Boolean',
    OBJECT_ID: 'ObjectId',
    ARRAY: 'Array',
    MIXED: 'Mixed',
    DECIMAL: 'Decimal128',
    MAP: 'Map',
    BUFFER: 'Buffer'
} as const;

export const DATA_TYPE_OPTIONS = [
    { label: 'String', value: 'STRING' },
    { label: 'Number', value: 'NUMBER' },
    { label: 'Date', value: 'DATE' },
    { label: 'Boolean', value: 'BOOLEAN' },
    { label: 'ObjectId', value: 'OBJECT_ID' },
    { label: 'Array', value: 'ARRAY' },
    { label: 'Mixed', value: 'MIXED' },
    { label: 'Decimal', value: 'DECIMAL' },
    { label: 'Map', value: 'MAP' },
    { label: 'Buffer', value: 'BUFFER' }
];