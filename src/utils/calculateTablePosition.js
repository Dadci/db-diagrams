export const calculateTablePosition = (tableCount) => {
    const GRID_SIZE = 280; // Increased space between tables
    const INITIAL_OFFSET = 50; // Increased initial padding
    const TABLES_PER_ROW = 4; // Reduced tables per row for more space

    const row = Math.floor(tableCount / TABLES_PER_ROW);
    const col = tableCount % TABLES_PER_ROW;

    return {
        x: INITIAL_OFFSET + (col * GRID_SIZE),
        y: INITIAL_OFFSET + (row * GRID_SIZE)
    };
};