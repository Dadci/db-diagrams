export const generateMarkdown = (schema) => {
  const markdown = [];

  // Add header
  markdown.push(`# ${schema.title || 'Database Schema'}`);
  markdown.push(`\n${schema.description || ''}\n`);

  // Add tables
  schema.tables.forEach(table => {
    markdown.push(`\n## ${table.name}\n`);
    markdown.push('| Field Name | Type | Required | Description |');
    markdown.push('|------------|------|----------|-------------|');
    
    table.fields.forEach(field => {
      markdown.push(
        `| ${field.name} | ${field.type} | ${field.required ? 'Yes' : 'No'} | ${field.description || ''} |`
      );
    });
    markdown.push('\n');
  });

  // Add relationships
  if (schema.edges?.length > 0) {
    markdown.push('\n## Relationships\n');
    markdown.push('| Source Table | Relationship | Target Table |');
    markdown.push('|--------------|--------------|--------------|');
    
    schema.edges.forEach(edge => {
      const sourceTable = schema.tables.find(t => t.id === edge.source)?.name;
      const targetTable = schema.tables.find(t => t.id === edge.target)?.name;
      markdown.push(
        `| ${sourceTable} | ${edge.data?.relationType || 'relates to'} | ${targetTable} |`
      );
    });
  }

  return markdown.join('\n');
};