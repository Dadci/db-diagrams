const tailwindColors = [
    'purple',
    'blue',
    'green',
    'red',
    'yellow',
    'pink',
    'indigo',
    'teal',
    'orange',
    'cyan'
];

export const getRandomTailwindColor = () => {
    const randomColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
    return `${randomColor}-600`; // Using 500 as the default intensity
};